import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="py-4 flex items-center justify-between">
      <Link href="/" className="font-black text-xl tracking-tight">My Aetherhub</Link>
      <nav className="flex gap-5 text-sm">
        <Link href="/features">Features</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/download">Download</Link>
        <Link href="/blog">Blog</Link>
      </nav>
    </header>
  );
}
