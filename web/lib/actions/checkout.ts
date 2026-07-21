"use server";

import { prisma } from "@/lib/prisma";
import { getAppSettings, validateEventDate } from "@/lib/settings";
import { haversineDistanceKm } from "@/lib/geo";

export interface DeliveryEstimate {
  withinArea: boolean;
  distanceKm: number;
  fee: number;
  radiusKm: number;
}

export async function estimateDeliveryFee(lat: number, lng: number): Promise<DeliveryEstimate> {
  const settings = await getAppSettings();
  const distanceKm = haversineDistanceKm(settings.kitchenLat, settings.kitchenLng, lat, lng);
  const withinArea = distanceKm <= settings.deliveryRadiusKm;
  const fee = withinArea ? Math.ceil(distanceKm) * settings.deliveryFeePerKm : 0;
  return { withinArea, distanceKm, fee, radiusKm: settings.deliveryRadiusKm };
}

export interface VoucherCheckResult {
  valid: boolean;
  message?: string;
  discountAmount?: number;
  voucherId?: string;
}

export async function checkVoucher(code: string, subtotal: number): Promise<VoucherCheckResult> {
  const voucher = await prisma.voucher.findUnique({ where: { code: code.trim().toUpperCase() } });
  if (!voucher || !voucher.isActive) {
    return { valid: false, message: "Kode voucher tidak ditemukan." };
  }

  const now = new Date();
  if (voucher.validFrom && now < voucher.validFrom) {
    return { valid: false, message: "Voucher belum berlaku." };
  }
  if (voucher.validUntil && now > voucher.validUntil) {
    return { valid: false, message: "Voucher sudah kedaluwarsa." };
  }
  if (voucher.usageLimit != null && voucher.usageCount >= voucher.usageLimit) {
    return { valid: false, message: "Voucher sudah mencapai batas pemakaian." };
  }
  if (voucher.minOrder != null && subtotal < voucher.minOrder) {
    return {
      valid: false,
      message: `Minimal belanja Rp ${voucher.minOrder.toLocaleString("id-ID")} untuk pakai voucher ini.`,
    };
  }

  const rawDiscount =
    voucher.discountType === "PERCENTAGE"
      ? Math.floor((subtotal * voucher.discountValue) / 100)
      : voucher.discountValue;

  return { valid: true, discountAmount: Math.min(rawDiscount, subtotal), voucherId: voucher.id };
}

export interface CheckoutItemInput {
  productId: string;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutItemInput[];
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryLat?: number;
  deliveryLng?: number;
  eventDate: string; // ISO date string, mis. "2026-07-25"
  deliveryTime: string; // "HH:mm"
  notes?: string;
  voucherCode?: string;
  userId?: string;
}

export interface CheckoutResult {
  success: boolean;
  error?: string;
  orderId?: string;
  needsManualReview?: boolean;
}

export async function createOrder(input: CheckoutInput): Promise<CheckoutResult> {
  if (input.items.length === 0) {
    return { success: false, error: "Keranjang kosong." };
  }
  if (!input.customerName.trim() || !input.customerPhone.trim() || !input.deliveryAddress.trim()) {
    return { success: false, error: "Nama, nomor WhatsApp, dan alamat wajib diisi." };
  }

  const settings = await getAppSettings();
  if (!settings.retailCheckoutEnabled) {
    return {
      success: false,
      error: "Maaf, kami sedang tidak menerima order online sementara waktu. Silakan hubungi kami langsung via WhatsApp.",
    };
  }

  const eventDate = new Date(input.eventDate);
  if (Number.isNaN(eventDate.getTime())) {
    return { success: false, error: "Tanggal pengantaran tidak valid." };
  }
  const dateCheck = validateEventDate(eventDate, settings.orderCutoffTime);
  if (!dateCheck.valid) {
    return { success: false, error: dateCheck.message };
  }

  const [th, tm] = input.deliveryTime.split(":").map(Number);
  if (Number.isNaN(th) || Number.isNaN(tm) || th < 7 || th > 20 || (th === 20 && tm > 0)) {
    return { success: false, error: "Jam pengantaran harus di antara 07.00–20.00 WIB." };
  }

  const productIds = input.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });
  if (products.length !== new Set(productIds).size) {
    return {
      success: false,
      error: "Beberapa produk di keranjang sudah tidak tersedia. Silakan cek ulang keranjang.",
    };
  }

  const orderItemsData = input.items.map((i) => {
    const product = products.find((p) => p.id === i.productId)!;
    return { productId: product.id, quantity: i.quantity, priceEach: product.price };
  });
  const subtotal = orderItemsData.reduce((sum, i) => sum + i.priceEach * i.quantity, 0);
  const isCustomEvent = products.some((p) => p.category === "PRASMANAN");

  let deliveryFee = 0;
  const hasGeolocation = input.deliveryLat != null && input.deliveryLng != null;
  if (hasGeolocation) {
    const estimate = await estimateDeliveryFee(input.deliveryLat!, input.deliveryLng!);
    if (!estimate.withinArea) {
      return {
        success: false,
        error: `Maaf, lokasi Anda (±${estimate.distanceKm.toFixed(1)} km) di luar area layanan kami (maks ${estimate.radiusKm} km). Silakan hubungi kami langsung via WhatsApp.`,
      };
    }
    deliveryFee = estimate.fee;
  }

  let discountAmount = 0;
  let voucherId: string | undefined;
  if (input.voucherCode?.trim()) {
    const voucherCheck = await checkVoucher(input.voucherCode, subtotal);
    if (!voucherCheck.valid) {
      return { success: false, error: voucherCheck.message };
    }
    discountAmount = voucherCheck.discountAmount ?? 0;
    voucherId = voucherCheck.voucherId;
  }

  const totalAmount = subtotal + deliveryFee - discountAmount;

  const order = await prisma.order.create({
    data: {
      customerName: input.customerName.trim(),
      customerPhone: input.customerPhone.trim(),
      deliveryAddress: input.deliveryAddress.trim(),
      deliveryLat: input.deliveryLat,
      deliveryLng: input.deliveryLng,
      deliveryFee,
      eventDate,
      deliveryTime: input.deliveryTime,
      notes: input.notes?.trim() || null,
      discountAmount,
      voucherId,
      totalAmount,
      isCustomEvent,
      userId: input.userId,
      items: { create: orderItemsData },
    },
  });

  if (voucherId) {
    await prisma.voucher.update({
      where: { id: voucherId },
      data: { usageCount: { increment: 1 } },
    });
  }

  // Order butuh review manual admin kalau: order custom/event besar (PRD §7), atau kita tidak
  // punya titik lokasi (geolocation) untuk hitung ongkir akurat — daripada menagih customer
  // dengan ongkir yang belum pasti, admin konfirmasi dulu total akhir via WhatsApp.
  const needsManualReview = isCustomEvent || !hasGeolocation;

  return { success: true, orderId: order.id, needsManualReview };
}
