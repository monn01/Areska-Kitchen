"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
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

/** Selalu balas sukses generik (tidak bocorkan apakah email terdaftar) — mencegah user enumeration.
 * `portal` cuma menentukan halaman reset mana yang dituju di link email (dipakai bareng oleh
 * pelanggan & admin, sama-sama akun di tabel User) — bukan pembeda hak akses. */
export async function requestPasswordReset(
  email: string,
  portal: "account" | "admin" = "account",
): Promise<{ success: true }> {
  const user = await prisma.user.findUnique({ where: { email: email.trim() } });

  if (user) {
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
    });

    const portalParam = portal === "admin" ? "&portal=admin" : "";
    const resetUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/account/reset-password?token=${token}${portalParam}`;
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

const profileSchema = z
  .object({
    name: z.string().trim().min(1, "Nama wajib diisi"),
    email: z.union([z.string().trim().email("Email tidak valid"), z.literal("")]).optional(),
    phone: z
      .union([z.string().trim().min(8, "Nomor WhatsApp tidak valid"), z.literal("")])
      .optional(),
    /// Data URI base64 hasil upload (diproses/dikompresi di browser, lihat ProfileForm.tsx) —
    /// bukan URL biasa, jadi divalidasi manual (bukan z.string().url()).
    avatarUrl: z
      .string()
      .trim()
      .refine((v) => v === "" || v.startsWith("data:image/"), "Format foto tidak valid")
      .refine((v) => v.length <= 700_000, "Ukuran foto terlalu besar, coba unggah ulang")
      .optional(),
    dateOfBirth: z.union([z.string().trim(), z.literal("")]).optional(),
    gender: z.union([z.enum(["MALE", "FEMALE"]), z.literal("")]).optional(),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: "Isi email atau nomor WhatsApp — minimal salah satu, dipakai untuk login",
    path: ["email"],
  });

export type ProfileFormState = { error?: string; success?: boolean };

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const session = await requireUser();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    avatarUrl: formData.get("avatarUrl"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  const email = parsed.data.email || undefined;
  const phone = parsed.data.phone ? normalizeIndonesianPhone(parsed.data.phone) : undefined;

  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== session.user.id) {
      return { error: "Email sudah dipakai akun lain." };
    }
  }
  if (phone) {
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing && existing.id !== session.user.id) {
      return { error: "Nomor WhatsApp sudah dipakai akun lain." };
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: parsed.data.name,
      email: email ?? null,
      phone: phone ?? null,
      avatarUrl: parsed.data.avatarUrl || null,
      dateOfBirth: parsed.data.dateOfBirth ? new Date(parsed.data.dateOfBirth) : null,
      gender: parsed.data.gender || null,
    },
  });

  revalidatePath("/account");
  return { success: true };
}
