"use client";
import type { MDXComponents } from "mdx/types";

/** Ensures MDX runs with a client context when needed. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
