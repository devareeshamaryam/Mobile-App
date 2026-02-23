 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LayoutDashboard, PlusCircle, List, LogOut } from "lucide-react";

const navItems = [
  {
    href: "/admin/add-mobile",
    label: "Add Mobile",
    icon: <PlusCircle className="w-4 h-4" />,
  },
  {
    href: "/admin/all-mobiles",
    label: "View All Mobiles",
    icon: <List className="w-4 h-4" />,
  },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/admin/add-mobile": {
    title: "Add New Mobile",
    subtitle: "Fill in all the details to add a new mobile to the inventory",
  },
  "/admin/all-mobiles": {
    title: "All Mobiles",
    subtitle: "View and manage all listed mobile devices",
  },
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Admin Dashboard", subtitle: "Welcome to admin panel" };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-[#1e3a8a] fixed top-0 left-0 h-screen flex flex-col z-50 shadow-xl">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#1e3a8a]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Hafeez Centre</p>
              <p className="text-blue-300 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav label */}
        <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest px-6 pt-5 pb-2">
          Menu
        </p>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-[#1e3a8a] shadow"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-[#1e3a8a]" : "text-blue-300"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="mt-auto px-3 pb-5 border-t border-blue-700 pt-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-[#1e3a8a] font-bold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">Admin</p>
              <p className="text-blue-300 text-xs truncate">admin@hafeez.pk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT SIDE ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">

        {/* ── TOP HEADER — Page Name ── */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
          {/* Left: Page Name */}
          <div className="flex items-center gap-4">
            {/* Blue accent bar */}
            <div className="w-1 h-10 bg-[#1e3a8a] rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {meta.title}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">{meta.subtitle}</p>
            </div>
          </div>

          {/* Right: Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-[#1e3a8a] font-semibold">Admin</span>
            <span>›</span>
            <span className="text-gray-600 font-medium">{meta.title}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}