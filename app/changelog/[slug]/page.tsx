// app/changelog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";
import { listSlugs, readMeta } from "@/lib/content";

export async function generateStaticParams() {
  return listSlugs("changelog").map((slug) => ({ slug }));
}

// Next 15: params is a Promise — await it
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = readMeta("changelog", slug);
  if (!meta) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/changelog/${slug}`;

  return {
    // let layout template append " • Aetherhub"
    title: `${meta.title} • Changelog`,
    description: meta.excerpt ?? "",
    openGraph: {
      title: `${meta.title} • Changelog`,
      description: meta.excerpt ?? "",
      url,
      images: ["/logo.png"], // or "/og.png" (1200x630) if you have it
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} • Changelog`,
      description: meta.excerpt ?? "",
      images: ["/logo.png"],
    },
    alternates: { canonical: `/changelog/${slug}` },
  };
}

export default async function ChangePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = readMeta("changelog", slug);
  if (!meta) notFound();

  return (
    <article className="prose prose-invert prose-docs max-w-none">
      <h1>{meta.title}</h1>
      <p className="text-[var(--ink-soft)]">
        {meta.date}
        {meta.version ? ` • v${meta.version}` : ""}
      </p>
      <PostClient slug={slug} />
    </article>
  );
}
