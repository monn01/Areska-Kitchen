import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VoucherForm } from "@/components/admin/VoucherForm";

export default async function EditVoucherPage({ params }: { params: { id: string } }) {
  const voucher = await prisma.voucher.findUnique({ where: { id: params.id } });
  if (!voucher) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Edit Voucher</h1>
      <div className="mt-6">
        <VoucherForm voucher={voucher} />
      </div>
    </div>
  );
}
