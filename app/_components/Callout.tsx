"use client";
import type { ReactNode } from "react";

type Variant = "info" | "warn" | "tip";
export default function Callout({
  type = "info",
  children,
}: { type?: Variant; children?: ReactNode }) {
  const styles: Record<Variant, string> = {
    info: "border-blue-300/40 bg-blue-400/10",
    warn: "border-amber-300/40 bg-amber-400/10",
    tip:  "border-emerald-300/40 bg-emerald-400/10",
  };
  return (
    <div className={`not-prose my-4 rounded-xl border p-4 ${styles[type]}`}>
      {children}
    </div>
  );
}
