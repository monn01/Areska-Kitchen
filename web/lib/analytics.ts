import { prisma } from "@/lib/prisma";

// Order dianggap "terhitung" pendapatannya kalau statusnya bukan PENDING/CANCELLED — hindari
// menghitung order yang belum pasti jadi/belum dibayar sebagai pendapatan riil.
const COUNTED_STATUSES = ["CONFIRMED", "PROCESSING", "COMPLETED"] as const;

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function startOfWeek(d: Date) {
  const copy = startOfDay(d);
  const day = copy.getDay(); // 0 = Minggu
  const diff = day === 0 ? 6 : day - 1; // mundur ke Senin
  copy.setDate(copy.getDate() - diff);
  return copy;
}

function startOfMonth(d: Date) {
  const copy = startOfDay(d);
  copy.setDate(1);
  return copy;
}

export async function getSalesSummary() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);

  const [today, week, month, topProductsRaw] = await Promise.all([
    prisma.order.aggregate({
      where: { createdAt: { gte: todayStart }, status: { in: [...COUNTED_STATUSES] } },
      _sum: { totalAmount: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { createdAt: { gte: weekStart }, status: { in: [...COUNTED_STATUSES] } },
      _sum: { totalAmount: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { createdAt: { gte: monthStart }, status: { in: [...COUNTED_STATUSES] } },
      _sum: { totalAmount: true },
      _count: true,
    }),
    prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
  ]);

  const products = await prisma.product.findMany({
    where: { id: { in: topProductsRaw.map((p) => p.productId) } },
  });

  const topProducts = topProductsRaw.map((p) => ({
    product: products.find((prod) => prod.id === p.productId),
    quantity: p._sum.quantity ?? 0,
  }));

  return {
    today: { orderCount: today._count, revenue: today._sum.totalAmount ?? 0 },
    week: { orderCount: week._count, revenue: week._sum.totalAmount ?? 0 },
    month: { orderCount: month._count, revenue: month._sum.totalAmount ?? 0 },
    topProducts,
  };
}
