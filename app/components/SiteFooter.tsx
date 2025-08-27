export default function SiteFooter() {
  return (
    <footer className="py-10 text-sm text-[var(--ink-soft)] border-t border-[var(--ink-border)]">
      <div className="flex items-center justify-between">
        <p>© {new Date().getFullYear()} Aetherhub. Made with 💻.</p>
        <div className="flex gap-4">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/support">Support</a>
        </div>
      </div>
    </footer>
  );
}
