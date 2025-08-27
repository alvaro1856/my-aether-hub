import Link from "next/link";
import { listEntries } from "@/lib/content";

export const metadata = { title: "Blog • Aetherhub" };

export default function BlogIndex() {
  const posts = listEntries("blog");
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="space-y-4">
        {posts.map(({ slug, meta }) => (
          <li key={slug} className="rounded-2xl bg-[var(--panel)] p-6 border border-[var(--ink-border)]">
            <Link className="underline text-lg font-semibold" href={`/blog/${slug}`}>
              {meta.title}
            </Link>
            <div className="text-[var(--ink-soft)] text-sm mt-1">
              {meta.date}{meta.author ? ` • ${meta.author}` : ""}
            </div>
            {meta.excerpt && <p className="text-[var(--ink-soft)] mt-2">{meta.excerpt}</p>}
          </li>
        ))}
        {posts.length === 0 && <li className="text-[var(--ink-soft)]">No posts yet.</li>}
      </ul>
    </section>
  );
}
