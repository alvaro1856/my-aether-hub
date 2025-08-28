"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/docs/getting-started", label: "Getting Started" },
  // add more as you add pages
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-20">
      <nav className="space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={[
                "block rounded-xl px-3 py-2 text-sm transition",
                active
                  ? "bg-[var(--panel)] border border-[var(--ink-border)]"
                  : "hover:bg-[var(--panel)] hover:border hover:border-[var(--ink-border)]",
              ].join(" ")}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
