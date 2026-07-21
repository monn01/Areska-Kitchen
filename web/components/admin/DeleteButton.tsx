"use client";

import { useTransition } from "react";

export function DeleteButton({
  action,
  confirmMessage = "Yakin ingin menghapus data ini?",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="text-sm font-medium text-[#B3432E] hover:underline disabled:opacity-50"
    >
      {isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
