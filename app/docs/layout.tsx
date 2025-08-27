export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8">
      <aside className="space-y-3 sticky top-6 h-fit">
        <h2 className="text-sm uppercase tracking-wide text-[var(--ink-soft)]">Docs</h2>
        <nav className="text-sm space-y-2">
          <a href="/docs/getting-started">Getting Started</a>
          <a href="/docs/install">Install</a>
          <a href="/docs/cli">CLI</a>
        </nav>
      </aside>

      {/* Prose styling here */}
      <article className="prose prose-invert prose-docs max-w-none">
        {children}
      </article>
    </div>
  );
}
