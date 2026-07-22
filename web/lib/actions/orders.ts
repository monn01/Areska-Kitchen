"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await requireAdmin();
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

/** Dipoll dari sidebar admin (OrderNotificationBadge) untuk badge + bunyi notifikasi order baru. */
export async function getPendingOrderCount() {
  await requireAdmin();
  return prisma.order.count({ where: { status: "PENDING" } });
}

/** Toggle darurat AppSetting.retailCheckoutEnabled — dipakai admin kalau dapur kewalahan. */
export async function toggleRetailCheckout(enabled: boolean) {
  await requireAdmin();
  const settings = await prisma.appSetting.findFirst();
  if (!settings) return;
  await prisma.appSetting.update({
    where: { id: settings.id },
    data: { retailCheckoutEnabled: enabled },
  });
  revalidatePath("/admin");
}
