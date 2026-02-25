"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Pencil, Trash2, Loader2, AlertCircle, Tag, ImageOff } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  createdAt: string;
}

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetching, setFetching]     = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => { setCategories(data); setFetching(false); })
      .catch((e) => { setError(e.message); setFetching(false); });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (e: any) {
      alert(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Loading ──
  if (fetching) return (
    <div className="bg-white rounded-2xl border border-gray-200 flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span className="text-sm">Loading categories…</span>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="bg-white rounded-2xl border border-red-200 flex flex-col items-center justify-center py-24 gap-3 text-red-500">
      <AlertCircle className="w-8 h-8" />
      <p className="text-sm font-semibold">{error}</p>
    </div>
  );

  // ── Empty ──
  if (categories.length === 0) return (
    <div className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
      <Tag className="w-10 h-10 opacity-30" />
      <p className="text-sm">No categories yet.</p>
      <Link
        href="/admin/add-category"
        className="mt-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs rounded-lg transition-all"
      >
        + Add First Category
      </Link>
    </div>
  );

  return (
    <div className="space-y-4">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{categories.length}</span> categories total
        </p>
        <Link
          href="/admin/add-category"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs rounded-lg shadow-sm transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Category
        </Link>
      </div>

      {/* Grid of category cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-yellow-300 transition-all group"
          >
            {/* Image */}
            <div className="h-28 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-3"
                />
              ) : (
                <ImageOff className="w-8 h-8 text-gray-200" />
              )}
            </div>

            {/* Info */}
            <div className="px-3 py-2.5">
              <p className="font-bold text-gray-800 text-sm truncate">{cat.name}</p>
              <p className="text-xs text-gray-400 font-mono truncate">/{cat.slug}</p>
            </div>

            {/* Actions */}
            <div className="px-3 pb-3 flex items-center gap-1.5">
              <Link
                href={`/admin/categories/${cat._id}/edit`}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 text-gray-400 transition-all text-xs font-medium"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(cat._id)}
                disabled={deletingId === cat._id}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-gray-400 transition-all text-xs font-medium disabled:opacity-50"
              >
                {deletingId === cat._id
                  ? <Loader2 className="w-3 h-3 animate-spin" />
                  : <Trash2 className="w-3 h-3" />
                }
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}