import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { KatalogAuthGate } from "@/components/auth/KatalogAuthGate";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { cn } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product || !product.isActive) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { category: product.category, isActive: true, id: { not: product.id } },
    orderBy: [{ isPopular: "desc" }, { name: "asc" }],
    take: 4,
  });

  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div
        aria-hidden={!session}
        className={cn(!session && "pointer-events-none select-none blur-sm")}
      >
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </div>
      {!session && <KatalogAuthGate />}
    </div>
  );
}
