export default function Features() {
  const features = [
    { title: "Auto-Updater", body: "Keep users current without effort." },
    { title: "Crash Reports", body: "See problems before tickets arrive." },
    { title: "Plugin System", body: "Extend core without bloat." },
  ];

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Features</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title} // 👈 unique key added
            className="rounded-2xl bg-[var(--panel)] p-6 border border-[var(--ink-border)]"
          >
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-[var(--ink-soft)]">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
