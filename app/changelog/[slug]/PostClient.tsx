"use client";

import dynamic from "next/dynamic";

export default function PostClient({ slug }: { slug: string }) {
  const MDX = dynamic(
    () => import(`@/content/changelog/${slug}/content.mdx`).then((m) => m.default),
    { ssr: false }
  );

  
  return <MDX />;
}
