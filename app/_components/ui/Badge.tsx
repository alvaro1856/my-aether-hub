"use client";
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl border border-[var(--ink-border)] bg-[var(--panel)] px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}
