import type { ReactNode } from "react";
import { Suspense } from "react";
import DocsSidebar from "../_components/DocsSidebar";
import TocHighlighter from "../_components/TocHighLighter"; // ensure spelling matches your file
import ClientToc from "../_components/ClientToc"; // <-- use wrapper

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)_240px]">
      {/* left: sidebar */}
      <div className="hidden lg:block">
        <Suspense fallback={null}>
          <DocsSidebar />
        </Suspense>
      </div>

      {/* center: page content */}
      <div>
        {children}
        <TocHighlighter />
      </div>

      {/* right: toc */}
      <div className="hidden xl:block">
        <ClientToc />
      </div>
    </section>
  );
}
