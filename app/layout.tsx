 import type { ReactNode } from "react";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper"; // ← Import karo

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>  {/* ← Wrap karo */}
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}