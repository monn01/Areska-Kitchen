import type { ProductCategory } from "@prisma/client";

export const CATEGORY_ORDER: ProductCategory[] = [
  "NASI_KOTAK",
  "PRASMANAN",
  "SNACK_BOX",
  "PEMPEK_LAINNYA",
];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  NASI_KOTAK: "Nasi Kotak",
  PRASMANAN: "Prasmanan",
  SNACK_BOX: "Snack Box",
  PEMPEK_LAINNYA: "Pempek & Lainnya",
};
