import { VoucherForm } from "@/components/admin/VoucherForm";

export default function NewVoucherPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Tambah Voucher</h1>
      <div className="mt-6">
        <VoucherForm />
      </div>
    </div>
  );
}
