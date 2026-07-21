"use client";

import { forwardRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// motion.create(Link) langsung, bukan <motion.span><Link/></motion.span> — bungkus span
// tanpa lebar eksplisit itu shrink-to-fit, jadi class seperti "w-full" yang nempel di
// <Link> di dalamnya tidak pernah benar-benar melebar mengikuti parent (beda perilaku
// dari cabang link eksternal di bawah yang tidak punya wrapper tambahan sama sekali).
const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent) => void;
  /** Tampilkan micro-interaction check singkat sebelum redirect (DESIGN.md §4.9) — dipakai untuk CTA WhatsApp. */
  confirmBeforeNavigate?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-orange-500 text-green-900 hover:bg-orange-600 shadow-sm hover:shadow-md",
  secondary:
    "bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 min-h-[44px] font-sans font-semibold text-base transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", className, children, ...props }, ref) {
    const shouldReduceMotion = useReducedMotion();
    const isGhost = variant === "ghost";
    const [confirming, setConfirming] = useState(false);

    const motionProps = shouldReduceMotion || isGhost
      ? {}
      : {
          whileHover: { y: -2 },
          whileTap: { y: 0, scale: 0.98 },
          transition: { duration: 0.15, ease: [0.34, 1.56, 0.64, 1] as const },
        };

    if ("href" in props && props.href) {
      const { href, target, rel, onClick, confirmBeforeNavigate } = props;
      const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");

      if (isExternal) {
        const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
          onClick?.(e);
          if (!confirmBeforeNavigate || confirming) return;
          e.preventDefault();
          setConfirming(true);
          window.setTimeout(() => {
            window.open(href, target ?? "_blank", "noopener,noreferrer");
            setConfirming(false);
          }, 450);
        };

        return (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel}
            onClick={handleClick}
            className={cn(baseClasses, variantClasses[variant], className)}
            {...motionProps}
          >
            {confirming ? (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="h-4 w-4" strokeWidth={2} />
                Terkirim
              </motion.span>
            ) : (
              children
            )}
          </motion.a>
        );
      }
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          className={cn(baseClasses, variantClasses[variant], className)}
          {...motionProps}
        >
          {children}
        </MotionLink>
      );
    }

    const { onClick, type, disabled, "aria-label": ariaLabel } =
      props as ButtonAsButton;
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? "button"}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  },
);
