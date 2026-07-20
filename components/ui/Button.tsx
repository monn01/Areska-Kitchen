"use client";

import { forwardRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md",
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

    const motionProps = shouldReduceMotion || isGhost
      ? {}
      : {
          whileHover: { y: -2 },
          whileTap: { y: 0, scale: 0.98 },
          transition: { duration: 0.15, ease: [0.34, 1.56, 0.64, 1] as const },
        };

    if ("href" in props && props.href) {
      const { href, target, rel, onClick } = props;
      const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");
      if (isExternal) {
        return (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel}
            onClick={onClick}
            className={cn(baseClasses, variantClasses[variant], className)}
            {...motionProps}
          >
            {children}
          </motion.a>
        );
      }
      return (
        <motion.span {...motionProps} className="inline-block">
          <Link
            href={href}
            onClick={onClick}
            className={cn(baseClasses, variantClasses[variant], className)}
          >
            {children}
          </Link>
        </motion.span>
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
