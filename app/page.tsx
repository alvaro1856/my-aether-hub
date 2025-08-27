// app/page.tsx

function ValueCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[var(--panel)] p-6 border border-[var(--ink-border)]">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-[var(--ink-soft)]">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <section className="space-y-14">
      {/* Hero */}
      <div className="rounded-3xl bg-[var(--panel)] p-10 shadow">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Ship your software without the chaos.
        </h1>
        <p className="mt-4 text-[var(--ink-soft)] max-w-2xl">
          Aetherhub is your command center—downloads, docs, changelogs, and
          updates in one place.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/download"
            className="btn bg-[var(--brand)] text-[var(--brand-ink)]"
          >
            Download
          </a>
          <a
            href="/features"
            className="btn border border-[var(--ink-border)]"
          >
            See Features
          </a>
        </div>
      </div>

      {/* Value props */}
      <div className="grid md:grid-cols-3 gap-6">
        <ValueCard title="Fast setup">
          Launch a product page in minutes.
        </ValueCard>
        <ValueCard title="Docs built-in">
          Guide users without 3rd-party sprawl.
        </ValueCard>
        <ValueCard title="Changelog">
          Make updates visible and exciting.
        </ValueCard>
      </div>

      {/* What you’ll get */}
      <div className="rounded-3xl bg-[var(--panel)] p-8">
        <h2 className="text-2xl font-bold mb-4">What you’ll get</h2>
        <ul className="space-y-2">
          <li className="flex gap-2 items-start">
            <span>✅</span>
            <span>Download channel with latest stable + previous versions</span>
          </li>
          <li className="flex gap-2 items-start">
            <span>✅</span>
            <span>Docs with search</span>
          </li>
          <li className="flex gap-2 items-start">
            <span>✅</span>
            <span>Pricing that’s ready for payments later</span>
          </li>
          <li className="flex gap-2 items-start">
            <span>✅</span>
            <span>Blog + Announcements</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
