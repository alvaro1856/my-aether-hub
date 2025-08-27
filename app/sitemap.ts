import type { MetadataRoute } from "next";
import { listEntries } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    "", "/features", "/pricing", "/download", "/docs", "/blog", "/changelog", "/support",
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    changeFrequency: "weekly" as const,
    priority: p ? 0.6 : 1,
  }));

  const blog: MetadataRoute.Sitemap = listEntries("blog").map(({ slug }) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const changes: MetadataRoute.Sitemap = listEntries("changelog").map(({ slug }) => ({
    url: `${base}/changelog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...blog,
    ...changes,
  ];

  return entries;
}
