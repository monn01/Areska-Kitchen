"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { createProduct, updateProduct, type ProductFormState } from "@/lib/actions/products";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/product-categories";
import type { Product } from "@prisma/client";

const CATEGORIES: { value: Product["category"]; label: string }[] = CATEGORY_ORDER.map((value) => ({
  value,
  label: CATEGORY_LABELS[value],
}));

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

export function ProductForm({ product }: { product?: Product }) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction] = useFormState<ProductFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Nama Produk
        </label>
        <input id="name" name="name" defaultValue={product?.name} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Kategori
        </label>
        <select
          id="category"
          name="category"
          defaultValue={product?.category ?? CATEGORIES[0].value}
          className={inputClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="price" className={labelClass}>
          Harga (Rp)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min={0}
          step={500}
          defaultValue={product?.price}
          required
          onWheel={(e) => e.currentTarget.blur()}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className={labelClass}>
          URL Gambar (opsional)
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://..."
          defaultValue={product?.imageUrl ?? ""}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-green-700/60">
          Tempel link gambar yang sudah di-hosting (mis. Google Drive, Cloudinary). Upload
          langsung dari dashboard belum tersedia.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-green-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={product?.isActive ?? true}
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
        />
        Tampilkan di menu publik
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-green-700">
        <input
          type="checkbox"
          name="isPopular"
          defaultChecked={product?.isPopular ?? false}
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
        />
        Tandai sebagai &ldquo;Paket Populer&rdquo; (tampil di landing page & badge katalog)
      </label>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}

      <SubmitButton label={product ? "Simpan Perubahan" : "Tambah Produk"} />
    </form>
  );
}
