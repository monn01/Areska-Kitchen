"use client";

import { useEffect, useRef, useState } from "react";
import { getPendingOrderCount } from "@/lib/actions/orders";

const POLL_INTERVAL_MS = 20_000;

/** Chime dua nada dibangkitkan lewat Web Audio API (bukan file audio) — tidak perlu aset
 * baru, dan browser modern lebih longgar memblokirnya dibanding elemen <audio>. Kalau
 * browser tetap memblokir sebelum ada interaksi user di halaman, badge angka tetap update. */
function playChime() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [880, 660].forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.18;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.35);
    });
  } catch {
    // diamkan — audio bukan bagian kritis dari fitur, badge angka tetap jadi sumber kebenaran
  }
}

export function OrderNotificationBadge({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const prevCountRef = useRef(initialCount);

  useEffect(() => {
    const interval = setInterval(async () => {
      const next = await getPendingOrderCount();
      if (next > prevCountRef.current) playChime();
      prevCountRef.current = next;
      setCount(next);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (count === 0) return null;

  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B3432E] px-1.5 text-xs font-semibold text-cream-50">
      {count}
    </span>
  );
}
