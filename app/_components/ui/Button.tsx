"use client";
import { ButtonHTMLAttributes } from "react";

type Variant = "brand" | "ghost" | "outline";
export default function Button({
  className = "",
  variant = "brand",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base = "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition";
  const map: Record<Variant,string> = {
    brand:  "bg-[var(--brand)] text-[var(--brand-ink)] hover:brightness-105",
    ghost:  "border border-[var(--ink-border)] hover:bg-[var(--panel)]",
    outline:"border-2 border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)]/10"
  };
  return <button className={`${base} ${map[variant]} ${className}`} {...props} />;
}
