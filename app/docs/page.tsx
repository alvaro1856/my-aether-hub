// app/docs/page.tsx
export default function DocsIndex() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Docs</h1>
      <ul className="list-disc pl-5">
        <li><a className="underline" href="/docs/getting-started">Getting Started</a></li>
        <li><a className="underline" href="/docs/install">Install</a></li>
        <li><a className="underline" href="/docs/cli">CLI</a></li>
      </ul>
    </section>
  );
}
