import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

/**
 * Webhook notifikasi Midtrans — verifikasi signature WAJIB sebelum percaya payload apa pun
 * (jangan pernah update status order dari body mentah tanpa validasi ini).
 * https://docs.midtrans.com/docs/https-notification-webhooks
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

  if (!order_id || !status_code || !gross_amount || !signature_key) {
    return NextResponse.json({ error: "Payload tidak lengkap" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHash("sha512")
    .update(order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY)
    .digest("hex");

  if (signature_key !== expectedSignature) {
    return NextResponse.json({ error: "Signature tidak valid" }, { status: 403 });
  }

  const transaction = await prisma.transaction.findUnique({
    where: { midtransOrderId: order_id },
  });
  if (!transaction) {
    return NextResponse.json({ error: "Transaksi tidak ditemukan" }, { status: 404 });
  }

  let newOrderStatus: "CONFIRMED" | "CANCELLED" | undefined;
  if (transaction_status === "settlement" || transaction_status === "capture") {
    newOrderStatus = "CONFIRMED";
  } else if (["deny", "cancel", "expire"].includes(transaction_status)) {
    newOrderStatus = "CANCELLED";
  }

  await prisma.transaction.update({
    where: { id: transaction.id },
    data: {
      midtransStatus: transaction_status,
      midtransTransactionId: body.transaction_id ?? undefined,
      paymentMethod: body.payment_type ?? undefined,
      paidAt: newOrderStatus === "CONFIRMED" ? new Date() : undefined,
    },
  });

  if (newOrderStatus) {
    await prisma.order.update({
      where: { id: transaction.orderId },
      data: { status: newOrderStatus },
    });
  }

  return NextResponse.json({ received: true });
}
