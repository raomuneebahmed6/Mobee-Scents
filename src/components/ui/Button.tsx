"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  withArrow?: boolean;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "bg-charcoal text-ivory hover:bg-charcoal/90 border border-charcoal",
  secondary: "bg-transparent text-charcoal border border-charcoal/40 hover:border-charcoal",
  ghost: "bg-transparent text-ivory border border-ivory/50 hover:border-ivory",
};

const sizes: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className, withArrow = false } = props;

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  const motionProps = {
    whileTap: { scale: 0.97 },
  };

  if ("href" in props && props.href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={props.href} className={classes} onClick={props.onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;

  return (
    <motion.button {...motionProps} type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </motion.button>
  );
}
