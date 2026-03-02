 import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a8a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Hafeez Centre Mobile Prices",
    template: "%s | Hafeez Centre",
  },
  description: "Latest mobile prices in Pakistan 2026.",
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