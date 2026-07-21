import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Ditulis manual (bukan next-auth/middleware's withAuth) karena butuh redirect ke halaman
// login BERBEDA untuk dua area proteksi: /admin/login untuk admin, /account/login untuk
// pelanggan — withAuth cuma mendukung satu halaman signIn global.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname.startsWith("/admin") && !token?.isAdmin) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/account") && !token) {
    const loginUrl = new URL("/account/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// "/admin" dan "/account" ditulis terpisah dari pola regex-nya karena butuh trailing slash —
// tanpa ini, path polos (tanpa segmen tambahan) lolos tanpa proteksi sama sekali (lihat
// TASKPLAN.md Fase 2 Phase 2, bug yang pernah ditemukan untuk kasus /admin).
export const config = {
  matcher: [
    "/admin",
    "/admin/((?!login).*)",
    "/account",
    "/account/((?!login|register).*)",
  ],
};
