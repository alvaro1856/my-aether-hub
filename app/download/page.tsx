type Build = { os:"mac"|"win"|"linux"; version:string; url:string; notes?:string };
const builds: Build[] = [
  { os:"mac", version:"1.0.3", url:"#", notes:"Apple Silicon" },
  { os:"win", version:"1.0.3", url:"#", notes:"Windows 10/11" },
  { os:"linux", version:"1.0.3", url:"#", notes:"Deb/RPM" },
];

export default function Download(){
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Download</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {builds.map(b=>(
          <a
            key={b.os+b.version}
            href={b.url}
            className="rounded-2xl bg-[var(--panel)] p-6 border border-[var(--ink-border)] hover:shadow"
          >
            <h3 className="font-semibold capitalize">{b.os}</h3>
            <p className="text-[var(--ink-soft)] mt-1">Latest: v{b.version}</p>
            <p className="text-[var(--ink-soft)] text-sm mt-2">{b.notes}</p>
          </a>
        ))}
      </div>
      <p className="text-[var(--ink-soft)] text-sm">
        Need older versions? <a className="underline" href="/download/archive">See archive</a>.
      </p>
    </section>
  );
}

