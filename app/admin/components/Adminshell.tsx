 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
  Tag,
  FolderOpen,
} from "lucide-react";

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface MobileItem {
  _id: string;
  name: string;
  brand: string;
  brandSlug?: string;
  price: number;
  stock?: number;
  condition?: string;
  color?: string;
  priceRange?: string;
}

// ── BRAND COLORS ──────────────────────────────────────────────────────────────
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

// ── MOBILES TABLE ─────────────────────────────────────────────────────────────
const PAGE_SIZE = 5;

function MobilesTable() {
  const [allMobiles, setAllMobiles]     = useState<MobileItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [fetching, setFetching]         = useState(true);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const loaderRef                       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/mobiles")
      .then((r) => { if (!r.ok) throw new Error(`Server error: ${r.status}`); return r.json(); })
      .then((data) => { setAllMobiles(data); setFetching(false); })
      .catch((e) => { setError(e.message); setFetching(false); });
  }, []);

  const visibleMobiles = allMobiles.slice(0, visibleCount);
  const hasMore = visibleCount < allMobiles.length;

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allMobiles.length));
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, hasMore, allMobiles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 1.0 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mobile?")) return;
    try {
      const res = await fetch(`/api/mobiles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setAllMobiles((prev) => prev.filter((m) => m._id !== id));
    } catch (err: any) {
      alert(err.message ?? "Could not delete mobile");
    }
  };

  if (fetching) return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" /><span className="text-sm">Loading mobiles…</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-2xl shadow-sm border border-red-200">
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
        <AlertCircle className="w-8 h-8" />
        <p className="text-sm font-semibold">{error}</p>
        <button onClick={() => window.location.reload()} className="text-xs underline text-red-400 hover:text-red-600">Try again</button>
      </div>
    </div>
  );

  if (allMobiles.length === 0) return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col items-center justify-center py-20 gap-2 text-gray-400">
        <List className="w-10 h-10 opacity-30" />
        <p className="text-sm">No mobiles found in inventory.</p>
        <Link href="/admin/add-mobile" className="mt-2 text-xs text-[#1e3a8a] font-semibold hover:underline">+ Add your first mobile</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/60">
        <p className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{visibleMobiles.length}</span> of{" "}
          <span className="font-semibold text-gray-700">{allMobiles.length}</span> devices
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Name</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visibleMobiles.map((mobile, index) => (
              <tr key={mobile._id} className="hover:bg-blue-50/40 transition-colors group">
                <td className="px-6 py-4 text-gray-400 text-xs font-mono">{String(index + 1).padStart(2, "0")}</td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-gray-900 group-hover:text-[#1e3a8a] transition-colors">{mobile.name}</p>
                  {mobile.color && <p className="text-xs text-gray-400 mt-0.5">{mobile.color}</p>}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${brandColors[mobile.brand] ?? "bg-gray-100 text-gray-600"}`}>
                    {mobile.brand}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-700 font-medium">
                  {mobile.price ? `Rs ${mobile.price.toLocaleString("en-PK")}` : mobile.priceRange ?? "—"}
                </td>
                <td className="px-4 py-4">
                  {mobile.condition
                    ? <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${mobile.condition === "New" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{mobile.condition}</span>
                    : <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Link href={`/admin/mobiles/${mobile._id}`} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 text-gray-400 hover:text-[#1e3a8a] transition-all" title="View"><Eye className="w-4 h-4" /></Link>
                    <Link href={`/admin/mobiles/${mobile._id}/edit`} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-100 text-gray-400 hover:text-amber-600 transition-all" title="Edit"><Pencil className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(mobile._id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div ref={loaderRef} className="flex items-center justify-center py-5">
        {loadingMore && <div className="flex items-center gap-2 text-xs text-gray-400"><Loader2 className="w-4 h-4 animate-spin" />Loading more…</div>}
        {!hasMore && !loadingMore && <p className="text-xs text-gray-400">All {allMobiles.length} devices loaded ✓</p>}
      </div>
    </div>
  );
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const navGroups = [
  {
    label: "Mobiles",
    items: [
      { href: "/admin/add-mobile",   label: "Add Mobile",       icon: <PlusCircle className="w-4 h-4" />, yellow: false },
      { href: "/admin/all-mobiles",  label: "View All Mobiles", icon: <List className="w-4 h-4" />,       yellow: false },
    ],
  },
  {
    label: "Categories",
    items: [
      { href: "/admin/add-category",    label: "Add Category",    icon: <Tag className="w-4 h-4" />,        yellow: true  },
      { href: "/admin/all-categories",  label: "All Categories",  icon: <FolderOpen className="w-4 h-4" />, yellow: false },
    ],
  },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/admin/add-mobile":      { title: "Add New Mobile",    subtitle: "Fill in all the details to add a new mobile to the inventory" },
  "/admin/all-mobiles":     { title: "All Mobiles",       subtitle: "View and manage all listed mobile devices" },
  "/admin/add-category":    { title: "Add Category",      subtitle: "Add a new brand or category with logo" },
  "/admin/all-categories":  { title: "All Categories",    subtitle: "Manage all mobile brands and categories" },
};

// ── MAIN SHELL ────────────────────────────────────────────────────────────────
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname     = usePathname();
  const meta         = pageMeta[pathname] ?? { title: "Admin Dashboard", subtitle: "Welcome to admin panel" };
  const isAllMobiles = pathname === "/admin/all-mobiles";

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
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-[#1e3a8a] font-bold text-sm">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">Admin</p>
              <p className="text-blue-300 text-xs truncate">admin@hafeez.pk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT SIDE ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-[#1e3a8a] rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{meta.title}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{meta.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* ── YELLOW BUTTON ── */}
            <Link
              href="/admin/add-category"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs rounded-lg shadow-sm transition-all active:scale-95"
            >
              <Tag className="w-3.5 h-3.5" />
              Add Category
            </Link>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="text-[#1e3a8a] font-semibold">Admin</span>
              <span>›</span>
              <span className="text-gray-600 font-medium">{meta.title}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {isAllMobiles ? <MobilesTable /> : children}
        </main>
      </div>
    </div>
  );
}