// app/components/SessionWrapper.tsx

"use client";  // ← Zaroor likhna hai!
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}