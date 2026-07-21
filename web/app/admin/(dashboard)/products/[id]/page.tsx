import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Edit Produk</h1>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
