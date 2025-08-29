"use client";
import type { ReactNode } from "react";
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-6 space-y-4 list-none pl-0">{children}</ol>;
}
export function Step({ children }: { children?: ReactNode }) {
  return <li className="rounded-xl border border-gray-200 p-4">{children}</li>;
}
