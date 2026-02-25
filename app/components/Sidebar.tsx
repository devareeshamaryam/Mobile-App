 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export default function Sidebar({ isOpen: mobileOpen = false, onClose }: SidebarProps) {
  const [isHovered, setIsHovered]     = useState(false);
  const [categories, setCategories]   = useState<Category[]>([]);
  const [loading, setLoading]         = useState(true);

  // ── Fetch categories from DB ──
  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => { setCategories(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-2xl ${
          mobileOpen ? 'translate-x-0 z-[70]' : '-translate-x-full md:translate-x-0 z-[60]'
        } ${isHovered ? 'w-64' : 'w-20'}`}
      >
        <div className="flex flex-col h-full">

          {/* Mobile Close */}
          {mobileOpen && (
            <button
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Logo */}
          <div className="w-full py-4 border-b border-gray-200 flex flex-col items-center justify-center gap-2">
            <Image
              src="/hafeezC.png"
              alt="Hafeez Centre Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
            <h2 className={`text-xs font-bold text-[#1e3a8a] text-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 hidden'
            }`}>
              Hafeez Centre
            </h2>
          </div>

          {/* Brands List */}
          <nav
            className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`nav::-webkit-scrollbar { display: none; }`}</style>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
              </div>
            )}

            {/* Categories */}
            {!loading && (
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <div key={cat._id} className="relative group">
                    <Link
                      href={`/${cat.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-1 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                    >
                      {/* Logo */}
                      <div className="w-16 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          // Fallback: first letter avatar
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <span className="text-[#1e3a8a] font-bold text-sm">
                              {cat.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <span className={`text-gray-800 font-medium text-base whitespace-nowrap transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                      }`}>
                        {cat.name}
                      </span>
                    </Link>

                    {/* Tooltip (collapsed state) */}
                    {!isHovered && !mobileOpen && (
                      <div className="hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[80] shadow-lg">
                        {cat.name}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty state */}
                {categories.length === 0 && (
                  <p className={`text-xs text-gray-400 text-center py-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    No brands yet
                  </p>
                )}
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}