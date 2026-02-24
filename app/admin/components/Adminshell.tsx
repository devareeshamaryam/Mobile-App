 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect, useRef, useCallback } from "react";
import { LayoutDashboard, PlusCircle, List, Eye, Pencil, Trash2, Loader2 } from "lucide-react";

// ── DUMMY DATA ───────────────────────────────────────────────────────────────
const dummyMobiles = [
  { id: 1,  name: "iPhone 15 Pro Max",        brand: "Apple",   price: 349000, stock: 12, condition: "New",  color: "Natural Titanium" },
  { id: 2,  name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 289000, stock: 7,  condition: "New",  color: "Titanium Black"   },
  { id: 3,  name: "Google Pixel 8 Pro",       brand: "Google",  price: 189000, stock: 4,  condition: "New",  color: "Obsidian"         },
  { id: 4,  name: "OnePlus 12",               brand: "OnePlus", price: 139000, stock: 19, condition: "New",  color: "Flowy Emerald"    },
  { id: 5,  name: "Xiaomi 14 Ultra",          brand: "Xiaomi",  price: 169000, stock: 6,  condition: "New",  color: "White"            },
  { id: 6,  name: "iPhone 14",                brand: "Apple",   price: 179000, stock: 3,  condition: "Used", color: "Midnight"         },
  { id: 7,  name: "Samsung Galaxy A55",       brand: "Samsung", price: 79000,  stock: 22, condition: "New",  color: "Navy"             },
  { id: 8,  name: "Vivo X100 Pro",            brand: "Vivo",    price: 149000, stock: 9,  condition: "New",  color: "Asteroid Black"   },
  { id: 9,  name: "Oppo Find X7",             brand: "Oppo",    price: 129000, stock: 11, condition: "New",  color: "Sea Blue"         },
  { id: 10, name: "Realme GT 5 Pro",          brand: "Realme",  price: 89000,  stock: 15, condition: "New",  color: "Space Journey"    },
];

const brandColors: Record<string, string> = {
  Apple:   "bg-gray-100 text-gray-700",
  Samsung: "bg-blue-50 text-blue-700",
  Google:  "bg-green-50 text-green-700",
  OnePlus: "bg-red-50 text-red-700",
  Xiaomi:  "bg-orange-50 text-orange-700",
  Vivo:    "bg-purple-50 text-purple-700",
  Oppo:    "bg-cyan-50 text-cyan-700",
  Realme:  "bg-yellow-50 text-yellow-700",
};

// ── MOBILES TABLE with Infinite Scroll ───────────────────────────────────────
const PAGE_SIZE = 5;

function MobilesTable() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const visibleMobiles = dummyMobiles.slice(0, visibleCount);
  const hasMore = visibleCount < dummyMobiles.length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, dummyMobiles.length));
      setLoading(false);
    }, 600);
  }, [loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 1.0 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Name</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visibleMobiles.map((mobile, index) => (
              <tr key={mobile.id} className="hover:bg-blue-50/40 transition-colors group">

                <td className="px-6 py-4 text-gray-400 text-xs font-mono">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-4 py-4">
                  <p className="font-semibold text-gray-900 group-hover:text-[#1e3a8a] transition-colors">
                    {mobile.name}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${brandColors[mobile.brand] ?? "bg-gray-100 text-gray-600"}`}>
                    {mobile.brand}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 text-gray-400 hover:text-[#1e3a8a] transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-100 text-gray-400 hover:text-amber-600 transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="flex items-center justify-center py-5">
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading more...
          </div>
        )}
        {!hasMore && !loading && (
          <p className="text-xs text-gray-400">All {dummyMobiles.length} devices loaded</p>
        )}
      </div>
    </div>
  );
}

// ── NAV + META ───────────────────────────────────────────────────────────────
const navItems = [
  { href: "/admin/add-mobile",  label: "Add Mobile",       icon: <PlusCircle className="w-4 h-4" /> },
  { href: "/admin/all-mobiles", label: "View All Mobiles", icon: <List className="w-4 h-4" /> },
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

// ── MAIN SHELL ───────────────────────────────────────────────────────────────
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Admin Dashboard", subtitle: "Welcome to admin panel" };
  const isAllMobiles = pathname === "/admin/all-mobiles";

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e3a8a] fixed top-0 left-0 h-screen flex flex-col z-50 shadow-xl">

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

        <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest px-6 pt-5 pb-2">Menu</p>

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
                <span className={isActive ? "text-[#1e3a8a]" : "text-blue-300"}>{item.icon}</span>
                {item.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-3 pb-5 border-t border-blue-700 pt-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-[#1e3a8a] font-bold text-sm">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">Admin</p>
              <p className="text-blue-300 text-xs truncate">admin@hafeez.pk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">

        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-[#1e3a8a] rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{meta.title}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{meta.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-[#1e3a8a] font-semibold">Admin</span>
            <span>›</span>
            <span className="text-gray-600 font-medium">{meta.title}</span>
          </div>
        </header>

        <main className="flex-1 p-8">
          {isAllMobiles ? (
            <MobilesTable />
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}