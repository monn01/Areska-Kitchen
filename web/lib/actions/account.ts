"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { normalizeIndonesianPhone } from "@/lib/utils";
import { sendPasswordResetEmail } from "@/lib/mailer";

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Nama wajib diisi"),
    email: z.union([z.string().trim().email("Email tidak valid"), z.literal("")]).optional(),
    phone: z
      .union([z.string().trim().min(8, "Nomor WhatsApp tidak valid"), z.literal("")])
      .optional(),
    password: z.string().min(6, "Password minimal 6 karakter"),
    agreedToTerms: z.literal(true, {
      message: "Anda harus menyetujui Kebijakan Layanan terlebih dahulu",
    }),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: "Isi email atau nomor WhatsApp",
    path: ["email"],
  });

export interface RegisterResult {
  success: boolean;
  error?: string;
}

export async function registerUser(input: {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  agreedToTerms: boolean;
}): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  const email = parsed.data.email ? parsed.data.email : undefined;
  const phone = parsed.data.phone ? normalizeIndonesianPhone(parsed.data.phone) : undefined;

  if (email) {
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      return { success: false, error: "Email sudah terdaftar. Silakan login." };
    }
  }
  if (phone) {
    const existingByPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingByPhone) {
      return { success: false, error: "Nomor WhatsApp sudah terdaftar. Silakan login." };
    }
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      phone,
      password: passwordHash,
      isAdmin: false,
    },
  });

  return { success: true };
}

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

/** Selalu balas sukses generik (tidak bocorkan apakah email terdaftar) — mencegah user enumeration. */
export async function requestPasswordReset(email: string): Promise<{ success: true }> {
  const user = await prisma.user.findUnique({ where: { email: email.trim() } });

  if (user) {
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/account/reset-password?token=${token}`;
    await sendPasswordResetEmail(email.trim(), resetUrl);
  }

  return { success: true };
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ResetPasswordResult> {
  if (newPassword.length < 6) {
    return { success: false, error: "Password minimal 6 karakter" };
  }

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { success: false, error: "Link reset sudah tidak berlaku, silakan minta ulang." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { password: passwordHash } }),
    prisma.passwordResetToken.deleteMany({ where: { userId: resetToken.userId } }),
  ]);

  return { success: true };
}
