import { notFound } from "next/navigation";
import PostClient from "./PostClient";
import { listSlugs, readMeta } from "@/lib/content";

export async function generateStaticParams() {
  return listSlugs("changelog").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = readMeta("changelog", params.slug);
  if (!meta) return {};
  return {
    title: `${meta.title} • Changelog • Aetherhub`,
    description: meta.excerpt ?? "",
  };
}

export default function ChangePage({ params }: { params: { slug: string } }) {
  const meta = readMeta("changelog", params.slug);
  if (!meta) notFound();

  return (
    <article className="prose prose-invert prose-docs max-w-none">
      <h1>{meta.title}</h1>
      <p className="text-[var(--ink-soft)]">
        {meta.date}{meta.version ? ` • v${meta.version}` : ""}
      </p>
      <PostClient slug={params.slug} />
    </article>
  );
}
