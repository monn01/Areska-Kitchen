"use server";

import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";

export interface InitiatePaymentResult {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}

export async function initiatePayment(orderId: string): Promise<InitiatePaymentResult> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });
  if (!order) return { success: false, error: "Order tidak ditemukan." };
  if (order.isCustomEvent) {
    return {
      success: false,
      error: "Order ini butuh konfirmasi admin dulu sebelum lanjut ke pembayaran.",
    };
  }

  // order_id Midtrans harus unik per percobaan bayar — beri suffix timestamp supaya
  // customer bisa retry kalau transaksi pertama gagal/kedaluwarsa tanpa bentrok.
  const midtransOrderId = `${order.id}-${Date.now()}`;

  const itemDetails = [
    ...order.items.map((i) => ({
      id: i.productId,
      price: i.priceEach,
      quantity: i.quantity,
      name: i.product.name.slice(0, 50),
    })),
    ...(order.deliveryFee > 0
      ? [{ id: "ongkir", price: order.deliveryFee, quantity: 1, name: "Ongkos Kirim" }]
      : []),
    ...(order.discountAmount > 0
      ? [{ id: "diskon", price: -order.discountAmount, quantity: 1, name: "Diskon Voucher" }]
      : []),
  ];

  const parameter = {
    transaction_details: {
      order_id: midtransOrderId,
      gross_amount: order.totalAmount,
    },
    customer_details: {
      first_name: order.customerName,
      phone: order.customerPhone,
    },
    item_details: itemDetails,
    callbacks: {
      finish: `${process.env.NEXTAUTH_URL}/order/${order.id}`,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    await prisma.transaction.upsert({
      where: { orderId },
      update: {
        midtransOrderId,
        snapToken: transaction.token,
        amount: order.totalAmount,
      },
      create: {
        orderId,
        amount: order.totalAmount,
        midtransOrderId,
        snapToken: transaction.token,
      },
    });
    return { success: true, redirectUrl: transaction.redirect_url };
  } catch (err) {
    console.error("Midtrans createTransaction error:", err);
    return {
      success: false,
      error: "Gagal membuat transaksi pembayaran. Silakan coba lagi atau hubungi kami via WhatsApp.",
    };
  }
}
