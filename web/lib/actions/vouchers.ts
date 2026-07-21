"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const voucherSchema = z.object({
  code: z.string().trim().min(1, "Kode wajib diisi").toUpperCase(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.coerce.number().int().positive("Nilai diskon harus lebih dari 0"),
  minOrder: z.coerce.number().int().nonnegative().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  usageLimit: z.coerce.number().int().positive().optional(),
  isActive: z.coerce.boolean(),
});

export type VoucherFormState = { error?: string };

function parseVoucherForm(formData: FormData) {
  return voucherSchema.safeParse({
    code: formData.get("code"),
    discountType: formData.get("discountType"),
    discountValue: formData.get("discountValue"),
    minOrder: formData.get("minOrder") || undefined,
    validFrom: formData.get("validFrom") || undefined,
    validUntil: formData.get("validUntil") || undefined,
    usageLimit: formData.get("usageLimit") || undefined,
    isActive: formData.get("isActive") === "on",
  });
}

export async function createVoucher(
  _prevState: VoucherFormState,
  formData: FormData,
): Promise<VoucherFormState> {
  await requireAdmin();
  const parsed = parseVoucherForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  const existing = await prisma.voucher.findUnique({ where: { code: parsed.data.code } });
  if (existing) {
    return { error: "Kode voucher sudah dipakai." };
  }

  await prisma.voucher.create({
    data: {
      ...parsed.data,
      validFrom: parsed.data.validFrom ? new Date(parsed.data.validFrom) : null,
      validUntil: parsed.data.validUntil ? new Date(parsed.data.validUntil) : null,
    },
  });

  revalidatePath("/admin/vouchers");
  redirect("/admin/vouchers");
}

export async function updateVoucher(
  id: string,
  _prevState: VoucherFormState,
  formData: FormData,
): Promise<VoucherFormState> {
  await requireAdmin();
  const parsed = parseVoucherForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.voucher.update({
    where: { id },
    data: {
      ...parsed.data,
      validFrom: parsed.data.validFrom ? new Date(parsed.data.validFrom) : null,
      validUntil: parsed.data.validUntil ? new Date(parsed.data.validUntil) : null,
    },
  });

  revalidatePath("/admin/vouchers");
  redirect("/admin/vouchers");
}

export async function deleteVoucher(id: string) {
  await requireAdmin();
  await prisma.voucher.delete({ where: { id } });
  revalidatePath("/admin/vouchers");
}
