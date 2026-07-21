"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const clientSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  logoUrl: z.string().trim().url("URL logo tidak valid").optional().or(z.literal("")),
  row: z.coerce.number().int().min(1).max(2),
  isVisible: z.coerce.boolean(),
});

export type ClientFormState = { error?: string };

export async function createClient(_prevState: ClientFormState, formData: FormData): Promise<ClientFormState> {
  await requireAdmin();

  const parsed = clientSchema.safeParse({
    name: formData.get("name"),
    logoUrl: formData.get("logoUrl"),
    row: formData.get("row"),
    isVisible: formData.get("isVisible") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.client.create({ data: { ...parsed.data, logoUrl: parsed.data.logoUrl || null } });

  revalidatePath("/admin/trusted-by");
  redirect("/admin/trusted-by");
}

export async function updateClient(
  id: string,
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await requireAdmin();

  const parsed = clientSchema.safeParse({
    name: formData.get("name"),
    logoUrl: formData.get("logoUrl"),
    row: formData.get("row"),
    isVisible: formData.get("isVisible") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.client.update({
    where: { id },
    data: { ...parsed.data, logoUrl: parsed.data.logoUrl || null },
  });

  revalidatePath("/admin/trusted-by");
  redirect("/admin/trusted-by");
}

export async function deleteClient(id: string) {
  await requireAdmin();
  await prisma.client.delete({ where: { id } });
  revalidatePath("/admin/trusted-by");
}
