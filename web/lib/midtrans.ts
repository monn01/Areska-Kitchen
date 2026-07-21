import midtransClient from "midtrans-client";

// Sandbox by default — set MIDTRANS_IS_PRODUCTION="true" di .env setelah akun bisnis
// terverifikasi dan siap pakai key production (lihat TASKPLAN.md Fase 2 Phase 7).
export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY ?? "",
});
