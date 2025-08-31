import Link from "next/link";
import ThemeToggle from "../_components/ThemeToggle"; // adjust path if needed

export default function SiteNav() {
  return (
    <header className="py-4 flex items-center justify-between">
      {/* Left: brand */}
      <Link href="/" className="font-black text-xl tracking-tight">
        My Aetherhub
      </Link>

      {/* Right: nav links + theme toggle */}
      <nav className="flex items-center gap-5 text-sm">
        <Link href="/features">Features</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/download">Download</Link>
        <Link href="/blog">Blog</Link>
        <ThemeToggle /> {/* 🌙 / ☀️ toggle button */}
      </nav>
    </header>
  );
}
