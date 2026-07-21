import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Tambah Testimoni</h1>
      <div className="mt-6">
        <TestimonialForm />
      </div>
    </div>
  );
}
