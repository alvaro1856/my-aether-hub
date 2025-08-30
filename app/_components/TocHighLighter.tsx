"use client";
import { useEffect, useState } from "react";

export default function TocHighlighter() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("article h2, article h3"))
      .filter((el): el is HTMLElement => !!el && !!el.id);

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (vis[0]) setActive((vis[0].target as HTMLElement).id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] }
    );

    headings.forEach(h => obs.observe(h));
    return () => obs.disconnect();
  }, []);

  // Apply `data-active` to matching TOC links
  useEffect(() => {
    const links = document.querySelectorAll('nav [data-toc-link="true"]');
    links.forEach((a) => a.removeAttribute("data-active"));
    if (active) {
      document.querySelectorAll(`nav a[href="#${CSS.escape(active)}"]`)
        .forEach((a) => a.setAttribute("data-active", "true"));
    }
  }, [active]);

  return null;
}
