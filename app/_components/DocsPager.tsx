"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_FLAT } from "../docs/nav";

export default function DocsPager() {
  const pathname = usePathname();
  const idx = DOCS_FLAT.findIndex((i) => pathname === i.href);
  if (idx === -1) return null;

  const prev = DOCS_FLAT[idx - 1];
  const next = DOCS_FLAT[idx + 1];

  return (
    <nav className="mt-12 flex justify-between text-sm">
      {prev ? (
        <Link
          href={prev.href!}
          className="rounded-lg border border-[var(--ink-border)] px-3 py-2 hover:bg-[var(--panel)]"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.href!}
          className="rounded-lg border border-[var(--ink-border)] px-3 py-2 hover:bg-[var(--panel)]"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
