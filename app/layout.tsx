 import type { ReactNode } from "react";
import type { Metadata } from "next"; // ← only this small import added (required for metadata)
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

export const metadata: Metadata = {
  // === Core / always needed ===
  title: {
    default: "Mobile App",                  // fallback title for the whole app
    template: "%s | Mobile App",            // child pages will become: "Page Name | Mobile App"
  },
  description: "A mobile-friendly web application built with Next.js – fast, responsive, and installable.",

  // === SEO essentials ===
  keywords: ["nextjs", "mobile app", "pwa", "react", "typescript"],
  robots: { index: true, follow: true },    // allow indexing (change to noindex on dev/staging if needed)
  alternates: {
    canonical: "https://yourdomain.com",    // ← replace with your real domain later
  },

  // === Mobile / PWA basics ===
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  themeColor: "#000000",                    // status bar / address bar color (change to your brand color)
  // appleMobileWebAppCapable: "yes",       // uncomment later if you want full-screen standalone mode on iOS
  // formatDetection: { telephone: false }, // prevents auto-linking phone numbers

  // === Open Graph (social sharing – Facebook, LinkedIn, WhatsApp, etc.) ===
  openGraph: {
    title: "Mobile App",
    description: "A mobile-friendly web application built with Next.js – fast, responsive, and installable.",
    url: "https://yourdomain.com",
    siteName: "Mobile App",
    images: [
      {
        url: "/og-image.png",               // place a 1200×630 image in /public/ later
        width: 1200,
        height: 630,
        alt: "Mobile App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // === Twitter Cards (X) – optional but nice ===
  twitter: {
    card: "summary_large_image",
    title: "Mobile App",
    description: "A mobile-friendly web application built with Next.js.",
    images: ["/og-image.png"],
  },

  // === Icons (favicon, app icons) – add real files in /public/ ===
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",         // 180×180 recommended for iOS
  },

  // === Manifest link for PWA (Next.js auto-handles if you add app/manifest.ts later) ===
  // manifest: "/manifest.webmanifest",    // uncomment once you create the manifest file
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}