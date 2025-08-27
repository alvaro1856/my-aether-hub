// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")),
  title: {
    default: "Aetherhub — Software that ships",
    template: "%s • Aetherhub",
  },
  description: "Your product’s home: downloads, docs, changelog, and more.",
  openGraph: {
  title: "Aetherhub — Software that ships",
  description: "Your product’s home: downloads, docs, changelog, and more.",
  url: "https://your-domain.com",
  siteName: "Aetherhub",
  images: [
    {
      url: "/logo.png", // 👈 now pointing to your custom image
      width: 1200,
      height: 630,
      alt: "Aetherhub — Software that ships",
    },
  ],
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Aetherhub — Software that ships",
  description: "Your product’s home: downloads, docs, changelog, and more.",
  images: ["/logo.png"], // 👈 same here
},
  robots: { index: true, follow: true },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[var(--app)] text-[var(--ink)]">
        <div className="mx-auto max-w-6xl px-4">
          <SiteNav />
          <main className="py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
