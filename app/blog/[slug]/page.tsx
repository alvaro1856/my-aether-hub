// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";
import { listSlugs, readMeta } from "@/lib/content";

export async function generateStaticParams() {
  return listSlugs("blog").map((slug) => ({ slug }));
}

// Next 15: params is a Promise — await it
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = readMeta("blog", slug);
  if (!meta) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/blog/${slug}`;

  return {
    // let layout template append " • Aetherhub"
    title: `${meta.title} • Blog`,
    description: meta.excerpt ?? "",
    openGraph: {
      title: `${meta.title} • Blog`,
      description: meta.excerpt ?? "",
      url, // absolute URL for this post
      images: ["/logo.png"], // or "/og.png" if you have a 1200x630
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} • Blog`,
      description: meta.excerpt ?? "",
      images: ["/logo.png"],
    },
    // metadataBase in layout will make this absolute
    alternates: { canonical: `/blog/${slug}` },
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
