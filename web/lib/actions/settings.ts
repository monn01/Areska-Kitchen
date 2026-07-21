"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const settingsSchema = z.object({
  orderCutoffTime: z.string().regex(/^\d{2}:\d{2}$/, "Format jam harus HH:mm"),
  kitchenLat: z.coerce.number(),
  kitchenLng: z.coerce.number(),
  deliveryRadiusKm: z.coerce.number().positive("Radius harus lebih dari 0"),
  deliveryFeePerKm: z.coerce.number().int().nonnegative(),
  retailCheckoutEnabled: z.coerce.boolean(),
});

export type SettingsFormState = { error?: string; success?: boolean };

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await requireAdmin();

  const parsed = settingsSchema.safeParse({
    orderCutoffTime: formData.get("orderCutoffTime"),
    kitchenLat: formData.get("kitchenLat"),
    kitchenLng: formData.get("kitchenLng"),
    deliveryRadiusKm: formData.get("deliveryRadiusKm"),
    deliveryFeePerKm: formData.get("deliveryFeePerKm"),
    retailCheckoutEnabled: formData.get("retailCheckoutEnabled") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  const existing = await prisma.appSetting.findFirst();
  if (existing) {
    await prisma.appSetting.update({ where: { id: existing.id }, data: parsed.data });
  } else {
    await prisma.appSetting.create({ data: parsed.data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/admin");
  return { success: true };
}
