"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registerUser } from "@/lib/actions/account";
import { cn } from "@/lib/utils";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.28a12 12 0 0 0 0 10.8Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.6l4.01 3.1C6.23 6.86 8.88 4.75 12 4.75Z"
      />
    </svg>
  );
}

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

/** Field password dengan toggle tampil/sembunyi (ikon mata) — dipakai di form masuk,
 * daftar, dan halaman reset password supaya konsisten. */
export function PasswordInput({
  id,
  value,
  onChange,
  required,
  minLength,
  autoComplete,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, "pr-11")}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-green-700/50 hover:text-green-700"
      >
        {visible ? (
          <EyeOff className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <Eye className="h-4 w-4" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

export function AuthForms({
  defaultTab = "login",
  onSuccess,
}: {
  defaultTab?: "login" | "register";
  onSuccess?: () => void;
}) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 flex rounded-full bg-green-50 p-1">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
              tab === t ? "bg-cream-50 text-green-700 shadow-sm" : "text-green-700/60",
            )}
          >
            {t === "login" ? "Masuk" : "Daftar"}
          </button>
        ))}
      </div>

      {tab === "login" ? (
        <LoginForm onSuccess={onSuccess} />
      ) : (
        <RegisterForm onSuccess={onSuccess} />
      )}
    </div>
  );
}

function GoogleButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: window.location.href });
      }}
      className="flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-green-200 bg-cream-50 px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
      ) : (
        <GoogleIcon className="h-4 w-4" />
      )}
      Lanjutkan dengan Google
    </button>
  );
}

function TermsNotice() {
  return (
    <p className="text-xs leading-relaxed text-green-700/70">
      Dengan mendaftar, Anda menyetujui{" "}
      <Link
        href="/kebijakan-layanan"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-green-600 hover:underline"
      >
        Kebijakan Layanan
      </Link>{" "}
      kami.
    </p>
  );
}

function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email: identifier,
      password,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      setError("Email/nomor WhatsApp atau password salah.");
      return;
    }

    onSuccess?.();
  }

  return (
    <div className="space-y-4">
      <GoogleButton />
      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-green-700/50">
        <span className="h-px flex-1 bg-green-100" />
        atau
        <span className="h-px flex-1 bg-green-100" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-identifier" className={labelClass}>
            Email atau Nomor WhatsApp
          </label>
          <input
            id="login-identifier"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="login-password" className={labelClass}>
            Password
          </label>
          <PasswordInput
            id="login-password"
            required
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
          />
          <Link
            href="/account/forgot-password"
            className="mt-1.5 inline-block text-xs font-medium text-green-600 hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        {error && <p className="text-sm text-[#B3432E]">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </div>
  );
}

function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    if (!agreedToTerms) {
      setError("Anda harus menyetujui Kebijakan Layanan terlebih dahulu.");
      return;
    }

    setLoading(true);
    const result = await registerUser({
      name,
      email: email || undefined,
      phone: phone || undefined,
      password,
      agreedToTerms,
    });

    if (!result.success) {
      setError(result.error ?? "Gagal mendaftar, silakan coba lagi.");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: email || phone,
      password,
      redirect: false,
    });
    setLoading(false);

    if (signInResult?.error) {
      setError("Akun berhasil dibuat, tapi auto-login gagal. Silakan masuk manual.");
      return;
    }

    onSuccess?.();
  }

  return (
    <div className="space-y-4">
      <GoogleButton />
      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-green-700/50">
        <span className="h-px flex-1 bg-green-100" />
        atau daftar dengan WhatsApp
        <span className="h-px flex-1 bg-green-100" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="register-name" className={labelClass}>
            Nama
          </label>
          <input
            id="register-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="register-phone" className={labelClass}>
            Nomor WhatsApp
          </label>
          <input
            id="register-phone"
            type="tel"
            required
            placeholder="08xxxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="register-email" className={labelClass}>
            Email <span className="font-normal text-green-700/50">(opsional, untuk reset password)</span>
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="register-password" className={labelClass}>
              Password
            </label>
            <PasswordInput
              id="register-password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <div>
            <label htmlFor="register-confirm-password" className={labelClass}>
              Ulangi Password
            </label>
            <PasswordInput
              id="register-confirm-password"
              required
              minLength={6}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-green-700/80">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-green-300 text-green-600 focus:ring-orange-300"
          />
          <TermsNotice />
        </label>

        {error && <p className="text-sm text-[#B3432E]">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Memproses..." : "Daftar"}
        </Button>
      </form>
    </div>
  );
}
