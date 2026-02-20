 // components/Header.tsx — with hover effect & home link
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
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
        <div className="flex-1 ml-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for mobiles..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* ========== DESKTOP ========== */}
      <div className="hidden md:flex items-center pl-24 pr-8 h-[65px] gap-6">

        {/* Left: Logo + Brand Name with hover + home link */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0 group transition-all duration-200"
        >
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

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="relative group w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search mobiles, brands..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-400 shadow-inner"
            />
          </div>
        </div>

        {/* Right: Balance spacer */}
        <div className="w-[200px] flex-shrink-0" />

      </div>
    </header>
  );
}