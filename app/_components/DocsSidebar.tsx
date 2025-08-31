"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DOCS_NAV, type NavItem } from "../docs/nav";

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw));
    } catch {}
  }, [key]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

export default function DocsSidebar() {
  const pathname = usePathname();

  // flatten for quick "is this section active" checks
  const allHrefs = useMemo(
    () =>
      DOCS_NAV.flatMap((n) => (n.items ? n.items.map((i) => i.href) : [n.href])).filter(
        Boolean
      ) as string[],
    []
  );

  return (
    <aside className="sticky top-20">
      <nav className="text-sm">
        <ul className="space-y-1">
          {DOCS_NAV.map((node, idx) =>
            node.items ? (
              <Group key={idx} node={node} pathname={pathname} />
            ) : (
              <li key={idx}>
                <SidebarLink href={node.href!} pathname={pathname}>
                  {node.title}
                </SidebarLink>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}

function Group({ node, pathname }: { node: NavItem; pathname: string }) {
  const storageKey = `docs:group:${node.title}`;
  const isInGroup = (node.items ?? []).some((i) => pathname.startsWith(i.href ?? "#"));
  const [open, setOpen] = useLocalStorage<boolean>(storageKey, isInGroup);

  useEffect(() => {
    // auto-open when navigating into this group
    if (isInGroup && !open) setOpen(true);
  }, [isInGroup, open, setOpen]);

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[var(--panel)] border border-transparent hover:border-[var(--ink-border)]"
        aria-expanded={open}
        aria-controls={`group-${node.title}`}
      >
        <span className="font-medium">{node.title}</span>
        <span
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
      </button>

      {open && (
        <ul id={`group-${node.title}`} className="mt-1 space-y-1 pl-2">
          {node.items!.map((child, i) => (
            <li key={i}>
              <SidebarLink href={child.href!} pathname={pathname} level={2}>
                {child.title}
              </SidebarLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function SidebarLink({
  href,
  pathname,
  children,
  level = 1,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3;
}) {
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-sidebar-link="true"
      data-active={active ? "true" : undefined}
      className={[
        "block rounded-lg px-2 py-1.5 transition",
        level >= 2 ? "ml-3 text-[var(--ink-soft)]" : "font-medium",
        active
          ? "bg-[var(--panel)] border border-[var(--ink-border)]"
          : "hover:bg-[var(--panel)]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
