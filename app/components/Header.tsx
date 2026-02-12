 // components/Header.tsx
'use client';

import Image from 'next/image';
import { Menu, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 z-50 h-[73px] shadow-sm">
      <div className="h-full max-w-full mx-auto flex items-center justify-between pl-2 pr-6 md:pl-3 md:pr-8">
        {/* Left: Logo FIRST + Mobile Menu + Brand Name */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          {/* Logo FIRST - Very Prominent */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
            <Image
              src="/hafeezC.png"
              alt="Hafeez Centre"
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0 border border-gray-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Brand Name - Navy Blue & Professional */}
          <div className="flex flex-col justify-center ml-1">
            <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a] tracking-tight leading-tight">
              Hafeez Centre
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide hidden sm:block">
              Mobile Price Portal
            </p>
          </div>
        </div>

        {/* Center: Search Bar - Professional Design */}
        <div className="flex-1 max-w-2xl mx-4 md:mx-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search for mobiles..."
              className="w-full pl-12 pr-5 py-3 text-sm md:text-base border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right: User Actions / Icons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Optional: Add user profile, cart, notifications etc */}
          <div className="hidden md:flex items-center gap-2">
            {/* Placeholder for future features */}
          </div>
        </div>
      </div>
    </header>
  );
}