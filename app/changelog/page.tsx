import Link from "next/link";
import { listEntries } from "@/lib/content";

export const metadata = { title: "Changelog • Aetherhub" };

export default function ChangelogIndex() {
  const items = listEntries("changelog");
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Changelog</h1>
      <ul className="space-y-4">
        {items.map(({ slug, meta }) => (
          <li key={slug} className="rounded-2xl bg-[var(--panel)] p-6 border border-[var(--ink-border)]">
            <Link className="underline text-lg font-semibold" href={`/changelog/${slug}`}>
              {meta.title}
            </Link>
            <div className="text-[var(--ink-soft)] text-sm mt-1">{meta.date}</div>
            {meta.excerpt && <p className="text-[var(--ink-soft)] mt-2">{meta.excerpt}</p>}
          </li>
        ))}
        {items.length === 0 && <li className="text-[var(--ink-soft)]">No releases yet.</li>}
      </ul>
    </section>
  );
}
