import fs from "node:fs";
import path from "node:path";

export type EntryMeta = {
  title: string;
  date: string;        // YYYY-MM-DD
  excerpt?: string;
  author?: string;
  version?: string;    // for changelog
};

const ROOT = process.cwd();

function entriesDir(kind: "blog" | "changelog") {
  return path.join(ROOT, "content", kind);
}

export function listSlugs(kind: "blog" | "changelog"): string[] {
  const dir = entriesDir(kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function readMeta(kind: "blog" | "changelog", slug: string): EntryMeta | null {
  const metaPath = path.join(entriesDir(kind), slug, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  const raw = fs.readFileSync(metaPath, "utf8");
  return JSON.parse(raw) as EntryMeta;
}

export function listEntries(kind: "blog" | "changelog"): { slug: string; meta: EntryMeta }[] {
  return listSlugs(kind)
    .map((slug) => ({ slug, meta: readMeta(kind, slug)! }))
    .filter((x) => !!x.meta)
    // newest first
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
