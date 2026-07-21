import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { normalizeIndonesianPhone } from "@/lib/utils";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // Nama field tetap "email" (dipakai apa adanya oleh /admin/login yang selalu isi
        // email) tapi nilainya sekarang boleh email ATAU nomor WhatsApp — dicocokkan ke
        // keduanya di bawah supaya pelanggan bisa masuk pakai nomor WA juga.
        email: { label: "Email atau Nomor WhatsApp", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const identifier = credentials.email.trim();
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: identifier }, { phone: normalizeIndonesianPhone(identifier) }],
          },
        });
        if (!user?.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: false,
        };
      },
    }),
  ],
  callbacks: {
    // Tidak pakai PrismaAdapter (session tetap JWT, konsisten dengan CredentialsProvider) —
    // jadi akun Google di-cocokkan/dibuat manual di sini berdasar email, supaya tetap dapat
    // User.id dari tabel kita sendiri (dipakai di semua tempat lain: Order.userId, dst).
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        let dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: { name: user.name ?? "Pengguna Google", email: user.email, isAdmin: false },
          });
        }
        user.id = dbUser.id;
        user.isAdmin = dbUser.isAdmin;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
};

/**
 * Pertahanan berlapis untuk Server Actions — middleware sudah melindungi navigasi halaman
 * /admin/*, tapi Server Action punya endpoint sendiri, jadi setiap action yang mengubah data
 * WAJIB verifikasi sesi admin sendiri, jangan cuma andalkan middleware.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }
  return session;
}

/** Sama seperti requireAdmin, tapi untuk action milik akun pelanggan (guest checkout tidak lewat sini). */
export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}
