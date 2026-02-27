'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Mobile {
  _id: string;
  name: string;
  price: number;
  images?: string[];
}

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Mobile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Outside click se dropdown band
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Search logic
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
        setResults(data.slice(0, 6));
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (id: string) => {
    setQuery('');
    setShowDropdown(false);
    router.push(`/mobile/${id}`);
  };

  // Dropdown component — styling same rakhi
  const Dropdown = () => (
    showDropdown && (
      <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
        {results.length > 0 ? (
          <>
            {results.map((mobile) => (
              <button
                key={mobile._id}
                onClick={() => handleSelect(mobile._id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="relative w-10 h-10 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  {mobile.images?.[0] ? (
                    <Image src={mobile.images[0]} alt={mobile.name} fill className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">📱</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{mobile.name}</p>
                  <p className="text-xs text-blue-600 font-bold">Rs. {mobile.price.toLocaleString('en-PK')}</p>
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="p-4 text-center text-sm text-gray-400">
            No mobiles found for "{query}"
          </div>
        )}
      </div>
    )
  );

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">

      {/* ========== MOBILE ========== */}
      <div className="flex md:hidden items-center gap-2 px-3 h-[52px]">
        <Link href="/" className="flex items-center gap-2 group transition-all duration-200">
          <div className="relative w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
            <Image src="/hafeezC.png" alt="Hafeez Centre" fill className="object-contain" priority />
          </div>
          <h1 className="text-base font-bold text-[#1e3a8a] tracking-tight flex-shrink-0 group-hover:text-blue-500 transition-colors duration-200">
            Hafeez Centre
          </h1>
        </Link>
        {/* ← Sirf ref aur state add hua, styling same */}
        <div className="flex-1 ml-1 relative" ref={ref}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for mobiles..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-gray-400"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <Dropdown />
        </div>
      </div>

      {/* ========== DESKTOP ========== */}
      <div className="hidden md:flex items-center pl-24 pr-8 h-[65px] gap-6">

        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group transition-all duration-200">
          <div className="relative w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
            <Image src="/hafeezC.png" alt="Hafeez Centre" fill className="object-contain" priority />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold text-[#1e3a8a] tracking-tight leading-tight group-hover:text-blue-500 transition-colors duration-200">
              Hafeez Centre
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide group-hover:text-blue-300 transition-colors duration-200">
              Mobile Price Portal
            </p>
          </div>
        </Link>

        {/* ← Sirf ref aur state add hua, styling same */}
        <div className="flex-1 flex justify-center">
          <div className="relative group w-full max-w-md" ref={ref}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mobiles, brands..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-400 shadow-inner"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Dropdown />
          </div>
        </div>

        <div className="w-[200px] flex-shrink-0" />
      </div>
    </header>
  );
}