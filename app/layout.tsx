 import type { ReactNode } from "react";
import "./globals.css"; // ← sirf yahan import karo

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}