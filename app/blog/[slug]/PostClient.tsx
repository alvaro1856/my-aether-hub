"use client";

import dynamic from "next/dynamic";

export default function PostClient({ slug }: { slug: string }) {
  // Client-side dynamic import of the MDX for this slug
  const MDX = dynamic(
    () => import(`@/content/blog/${slug}/content.mdx`).then(m => m.default),
    { ssr: false }
  );

  
  return <MDX />;
}
