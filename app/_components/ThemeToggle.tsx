"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark"|"light">("dark");

  // initialize from localStorage or OS
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark"|"light"|null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored === "light" ? "light" : "dark");
    } else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      onClick={toggle}
      className="rounded-xl border border-[var(--ink-border)] px-3 py-1 text-sm hover:bg-[var(--panel)]"
      aria-label="Toggle color mode"
      title="Toggle color mode"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
