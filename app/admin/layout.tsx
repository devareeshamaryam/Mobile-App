 // ✅ Server Component — no "use client"
import { ReactNode } from "react";
import AdminShell from "./components/Adminshell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}