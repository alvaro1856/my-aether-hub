import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const withMDX = createMDX({ extension: /\.mdx?$/ });
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    root: __dirname, 
  },
};

export default withMDX(nextConfig);
