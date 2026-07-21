"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

const addressSchema = z.object({
  label: z.string().trim().min(1, "Label wajib diisi (mis. Rumah, Kantor)"),
  address: z.string().trim().min(1, "Alamat wajib diisi"),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  isDefault: z.coerce.boolean().optional(),
});

export type AddressFormState = { error?: string };

export async function createAddress(
  _prevState: AddressFormState,
  formData: FormData,
): Promise<AddressFormState> {
  const session = await requireUser();

  const parsed = addressSchema.safeParse({
    label: formData.get("label"),
    address: formData.get("address"),
    isDefault: formData.get("isDefault") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  if (parsed.data.isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  await prisma.address.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  revalidatePath("/account");
  return {};
}

export async function deleteAddress(addressId: string) {
  const session = await requireUser();
  await prisma.address.deleteMany({ where: { id: addressId, userId: session.user.id } });
  revalidatePath("/account");
}

export async function setDefaultAddress(addressId: string) {
  const session = await requireUser();
  await prisma.address.updateMany({
    where: { userId: session.user.id },
    data: { isDefault: false },
  });
  await prisma.address.updateMany({
    where: { id: addressId, userId: session.user.id },
    data: { isDefault: true },
  });
  revalidatePath("/account");
}
