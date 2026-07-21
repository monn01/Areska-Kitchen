import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Tambah Produk</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
