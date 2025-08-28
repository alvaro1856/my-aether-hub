// app/mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout: ({ type = "info", children }: { type?: "info" | "warn" | "tip"; children: React.ReactNode }) => {
      const shades: Record<string, string> = {
        info: "border-blue-400/30 bg-blue-400/10",
        warn: "border-yellow-400/30 bg-yellow-400/10",
        tip: "border-emerald-400/30 bg-emerald-400/10",
      };
      return (
        <div className={`rounded-xl border px-4 py-3 text-sm ${shades[type] || shades.info}`}>
          {children}
        </div>
      );
    },
    Steps: ({ children }: { children: React.ReactNode }) => (
      <ol className="counter-reset list-none space-y-3">
        {Array.isArray(children)
          ? children.map((li, i) => (
              <li key={i} className="relative rounded-xl border border-[var(--ink-border)] bg-[var(--panel)] p-4 pl-10">
                <span className="absolute left-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--ink-border)] text-xs">
                  {i + 1}
                </span>
                {li as React.ReactNode}
              </li>
            ))
          : children}
      </ol>
    ),
  };
}
