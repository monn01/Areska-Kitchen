import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientForm } from "@/components/admin/ClientForm";

export default async function EditTrustedByPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">
        Edit &ldquo;Dipercaya Oleh&rdquo;
      </h1>
      <div className="mt-6">
        <ClientForm client={client} />
      </div>
    </div>
  );
}
