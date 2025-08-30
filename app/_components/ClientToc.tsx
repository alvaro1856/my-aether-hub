"use client";
import dynamic from "next/dynamic";

// Load ToC only on the client
const DynamicToc = dynamic(() => import("./Toc"), { ssr: false });

export default function ClientToc() {
  return <DynamicToc />;
}
