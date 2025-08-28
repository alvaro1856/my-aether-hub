"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id: string; text: string; level: number };

export default function Toc({ root = "article" }: { root?: string }) {
  const [activeId, setActiveId] = useState<string>("");

  const items = useMemo<Item[]>(() => {
    if (typeof document === "undefined") return [];
    const scope = document.querySelector(root) ?? document;
    const hs = Array.from(scope.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    return hs
      .filter((h) => h.id || (h.textContent ?? "").trim())
      .map((h) => ({
        id: h.id || (h.textContent ?? "").trim().toLowerCase().replace(/\s+/g, "-"),
        text: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      }));
  }, [root]);

  useEffect(() => {
    // Ensure headings have ids
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (!el) {
        const found = Array.from(document.querySelectorAll("h2, h3")).find(
          (h) => (h.textContent ?? "").trim() === i.text
        );
        if (found) found.id = i.id;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] }
    );

    document.querySelectorAll("h2, h3").forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-20">
      <div className="text-sm mb-2 font-semibold">On this page</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={[
                "block rounded px-2 py-1 transition",
                i.level === 3 ? "ml-3 text-[var(--ink-soft)]" : "",
                activeId === i.id ? "bg-[var(--panel)] border border-[var(--ink-border)]" : "hover:bg-[var(--panel)]",
              ].join(" ")}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
