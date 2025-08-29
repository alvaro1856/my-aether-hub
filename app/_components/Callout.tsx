"use client";
import type { ReactNode } from "react";
export default function Callout({ children }: { children?: ReactNode }) {
  return <div className="not-prose my-4 rounded-xl border p-4">{children}</div>;
}
