"use client";

import Link from "next/link";

const docs = [
  { slug: "getting-started", title: "Getting Started" },
  { slug: "install", title: "Install" },
  { slug: "cli", title: "CLI" },
];

export default function DocsSidebar() {
  return (
    <aside className="space-y-2">
      <h2 className="text-sm font-semibold text-[var(--ink-soft)] uppercase">
        Docs
      </h2>
      <ul className="space-y-1">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/docs/${doc.slug}`}
              className="hover:underline text-[var(--ink)]"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
