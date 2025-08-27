import { notFound } from "next/navigation";
import PostClient from "./PostClient";
import { listSlugs, readMeta } from "@/lib/content";

export async function generateStaticParams() {
  return listSlugs("blog").map((slug) => ({ slug }));
}

// 👇 params is now a Promise in Next 15 — await it
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = readMeta("blog", slug);
  if (!meta) return {};
  return {
    title: `${meta.title} • Blog • Aetherhub`,
    description: meta.excerpt ?? "",
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = readMeta("blog", slug);
  if (!meta) notFound();

  return (
    <article className="prose prose-invert prose-docs max-w-none">
      <h1>{meta.title}</h1>
      <p className="text-[var(--ink-soft)]">
        {meta.date}
        {meta.author ? ` • ${meta.author}` : ""}
      </p>
      <PostClient slug={slug} />
    </article>
  );
}
