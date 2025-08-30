"use client";
import { useMemo, useState } from "react";

export default function Pre(props: any) {
  // MDX renders fenced blocks as: <pre><code class="language-xxx">...</code></pre>
  const codeEl = Array.isArray(props.children) ? props.children[0] : props.children;

  const lang = useMemo(() => {
    const cls = (codeEl as any)?.props?.className ?? "";
    const m = cls.match(/language-([a-z0-9+-]+)/i);
    return m?.[1]?.toLowerCase() ?? "text";
  }, [codeEl]);

  const text = useMemo(() => {
    const raw = (codeEl as any)?.props?.children;
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw)) return raw.join("");
    return "";
  }, [codeEl]);

  const [copied, setCopied] = useState(false);
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  // Non-fenced blocks: just render <pre> normally
  const isFence = !!(codeEl as any)?.props?.className?.includes("language-");
  if (!isFence) return <pre {...props} />;

  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border border-[var(--ink-border)] bg-[color-mix(in_oklab,var(--panel)_92%,black)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 text-xs border-b border-[var(--ink-border)] bg-[var(--panel)]/60">
        <span className="uppercase tracking-wide opacity-70">{lang}</span>
        <button
          onClick={onCopy}
          className="rounded-md border border-[var(--ink-border)] px-2 py-1 leading-none transition hover:bg-[var(--panel)]"
          aria-label="Copy code to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code body (keep original pre>code to preserve formatting & highlighting) */}
      <div className="relative">
        <pre className="m-0 overflow-x-auto p-4 text-sm">
          {codeEl}
        </pre>
      </div>
    </div>
  );
}
