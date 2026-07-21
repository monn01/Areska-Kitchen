"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function AccountLogoutButton() {
  return (
    <Button type="button" variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>
      Keluar
    </Button>
  );
}
