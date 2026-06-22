import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "navy";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-brand-navy hover:bg-brand-gold/90 border border-brand-gold h-14 px-[22px] py-4",
  secondary:
    "bg-transparent text-brand-gold border border-brand-gold hover:bg-brand-gold/10 h-14 px-[22px] py-4",
  outline:
    "bg-transparent text-brand-navy border border-brand-navy hover:bg-brand-lilac h-14 px-[22px] py-4",
  navy: "bg-brand-navy text-white border border-brand-navy hover:bg-brand-navy/90 h-14 px-[22px] py-4",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

export function Button({
  variant = "primary",
  className = "",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full text-base font-medium transition-colors ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
