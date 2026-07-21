import { ClientForm } from "@/components/admin/ClientForm";

export default function NewTrustedByPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">
        Tambah &ldquo;Dipercaya Oleh&rdquo;
      </h1>
      <div className="mt-6">
        <ClientForm />
      </div>
    </div>
  );
}
