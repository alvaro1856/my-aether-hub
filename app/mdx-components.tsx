import type { MDXComponents } from "mdx/types";
import dynamic from "next/dynamic";

const Callout = dynamic(() => import("./_components/Callout"), { ssr: false });
const Steps   = dynamic(() => import("./_components/Steps").then(m => m.Steps), { ssr: false });
const Step    = dynamic(() => import("./_components/Steps").then(m => m.Step),  { ssr: false });

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Callout, Steps, Step };
}
