// global.d.ts

/// <reference types="react" />

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export const frontmatter: Record<string, any>;
  export default MDXComponent;
}
