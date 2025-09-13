// app/layout.tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import NavAuth from "./components/NavAuth";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const ogImage = "/logo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://myaetherhub.com"),
  title: { default: "Aetherhub — Software that ships", template: "%s • Aetherhub" },
  description: "Your product’s home: downloads, docs, changelog, and more.",
  openGraph: {
    type: "website",
    url: "https://myaetherhub.com",           
    siteName: "Aetherhub",
    title: "Aetherhub — Software that ships",
    description: "Your product’s home: downloads, docs, changelog, and more.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Aetherhub — Software that ships" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aetherhub — Software that ships",
    description: "Your product’s home: downloads, docs, changelog, and more.",
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://myaetherhub.com" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[var(--app)] text-[var(--ink)]">
        <div className="mx-auto max-w-6xl px-4">
          <SiteNav />
          <NavAuth />
          <main className="py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
