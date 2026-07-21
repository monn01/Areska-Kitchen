"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const productSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  category: z.enum(["NASI_KOTAK", "PRASMANAN", "SNACK_BOX", "PEMPEK_LAINNYA"]),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
  price: z.coerce.number().int().positive("Harga harus lebih dari 0"),
  imageUrl: z
    .string()
    .trim()
    .url("URL gambar tidak valid")
    .optional()
    .or(z.literal("")),
  isActive: z.coerce.boolean(),
  isPopular: z.coerce.boolean(),
});

export type ProductFormState = { error?: string };

export async function createProduct(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"),
    isActive: formData.get("isActive") === "on",
    isPopular: formData.get("isPopular") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.product.create({
    data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"),
    isActive: formData.get("isActive") === "on",
    isPopular: formData.get("isPopular") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.product.update({
    where: { id },
    data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/katalog");
}
