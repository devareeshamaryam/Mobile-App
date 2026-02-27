'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Mobile {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  brand: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Mobile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Outside click se dropdown band karo
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Search API call
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/mobiles?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 6)); // Sirf 6 results dikhao
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms wait karo type karne ke baad

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (id: string) => {
    setQuery('');
    setShowDropdown(false);
    router.push(`/mobile/${id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mobiles, brands..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
          />

          {/* Loading spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {results.map((mobile) => (
            <button
              key={mobile._id}
              onClick={() => handleSelect(mobile._id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
            >
              {/* Image */}
              <div className="relative w-10 h-10 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                {mobile.images?.[0] ? (
                  <Image src={mobile.images[0]} alt={mobile.name} fill className="object-contain p-1" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">📱</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{mobile.name}</p>
                <p className="text-xs text-blue-600 font-bold">Rs. {mobile.price.toLocaleString('en-PK')}</p>
              </div>
            </button>
          ))}

          {/* View All */}
          <button
            onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
            className="w-full text-center py-3 text-sm text-blue-600 font-semibold border-t border-gray-100 hover:bg-blue-50 transition-colors"
          >
            View all results for "{query}"
          </button>
        </div>
      )}

      {/* No Results */}
      {showDropdown && !loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4 text-center text-sm text-gray-400">
          No mobiles found for "{query}"
        </div>
      )}
    </div>
  );
}