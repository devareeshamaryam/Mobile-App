 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Tag,
  FolderOpen,
} from "lucide-react";

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const navGroups = [
  {
    label: "Mobiles",
    items: [
      { href: "/admin/add-mobile",  label: "Add Mobile",       icon: <PlusCircle className="w-4 h-4" />, yellow: false },
      { href: "/admin/all-mobiles", label: "View All Mobiles", icon: <List className="w-4 h-4" />,       yellow: false },
    ],
  },
  {
    label: "Categories",
    items: [
      { href: "/admin/add-category",   label: "Add Category",   icon: <Tag className="w-4 h-4" />,        yellow: true  },
      { href: "/admin/all-categories", label: "All Categories", icon: <FolderOpen className="w-4 h-4" />, yellow: false },
    ],
  },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/admin/add-mobile":     { title: "Add New Mobile",  subtitle: "Fill in all the details to add a new mobile to the inventory" },
  "/admin/all-mobiles":    { title: "All Mobiles",     subtitle: "View and manage all listed mobile devices" },
  "/admin/add-category":   { title: "Add Category",    subtitle: "Add a new brand or category with logo" },
  "/admin/all-categories": { title: "All Categories",  subtitle: "Manage all mobile brands and categories" },
};

// ── MAIN SHELL ────────────────────────────────────────────────────────────────
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta     = pageMeta[pathname] ?? { title: "Admin Dashboard", subtitle: "Welcome to admin panel" };

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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest px-3 pb-2">
                {group.label}
              </p>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? item.yellow
                            ? "bg-yellow-400 text-gray-900 shadow"
                            : "bg-white text-[#1e3a8a] shadow"
                          : item.yellow
                          ? "text-yellow-300 hover:bg-yellow-400 hover:text-gray-900"
                          : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      <span className={
                        isActive
                          ? item.yellow ? "text-gray-900" : "text-[#1e3a8a]"
                          : item.yellow ? "text-yellow-300" : "text-blue-300"
                      }>
                        {item.icon}
                      </span>
                      {item.label}
                      {isActive && (
                        <span className={`ml-auto w-1.5 h-1.5 rounded-full ${item.yellow ? "bg-gray-900" : "bg-[#1e3a8a]"}`} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 pb-5 border-t border-blue-700 pt-4">
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

        {/* ── HEADER — sirf ek baar render hota hai ── */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-[#1e3a8a] rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{meta.title}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{meta.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/add-category"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs rounded-lg shadow-sm transition-all active:scale-95"
            >
              <Tag className="w-3.5 h-3.5" />
              Add Category
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <span className="text-[#1e3a8a] font-semibold">Admin</span>
              <span>›</span>
              <span className="text-gray-600 font-medium">{meta.title}</span>
            </div>
          </div>
        </header>

        {/* ── MAIN — left-aligned, full width ── */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}