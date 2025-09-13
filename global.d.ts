// global.d.ts
import type { PrismaClient } from "@prisma/client";

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  const MDXComponent: (props: MDXProps) => JSX.Element;
  export const frontmatter: Record<string, unknown>;
  export default MDXComponent;
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export {};
