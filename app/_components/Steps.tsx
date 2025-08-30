"use client";
import type { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-6 list-none pl-0 [counter-reset:step] space-y-3">
      {children}
    </ol>
  );
}

export function Step({ children }: { children?: ReactNode }) {
  return (
    <li className="relative rounded-xl border border-[var(--ink-border)] bg-[var(--panel)] p-4 pl-10
                   before:absolute before:left-3 before:top-3 before:inline-flex before:h-6 before:w-6
                   before:items-center before:justify-center before:rounded-full before:border
                   before:border-[var(--ink-border)] before:text-xs before:[counter-increment:step]
                   before:content-[counter(step)]">
      {children}
    </li>
  );
}
