import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ token }) => token?.isAdmin === true,
    },
  },
);

// Lindungi /admin dan semua /admin/* KECUALI halaman login itu sendiri (supaya tidak infinite
// redirect). "/admin" ditulis terpisah karena pola regex di bawah butuh trailing slash — tanpa
// ini, path "/admin" polos (tanpa segmen tambahan) lolos tanpa proteksi sama sekali.
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
