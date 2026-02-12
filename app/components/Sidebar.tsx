 // components/Sidebar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const brands = [
  { 
    name: 'Samsung', 
    logo: '/image.png',
  },
  { 
    name: 'Vivo', 
    logo: '/vivo (1).svg',
  },
  { 
    name: 'Oppo', 
    logo: '/oppo1.svg',
  },
  { 
    name: 'Realme', 
    logo: '/realme.svg',
  },
  { 
    name: 'Apple', 
    logo: '/apple(1).svg',
  },
  { 
    name: 'Xiaomi', 
    logo: '/xiaomi (1).svg',
  },
  { 
    name: 'Infinix', 
    logo: '/infinix (1).svg',
  },
  { 
    name: 'Tecno', 
    logo: '/tecno (1).svg',
  },
  { 
    name: 'Nokia', 
    logo: '/nokia (1).svg',
  },
];

export default function Sidebar({ isOpen: mobileOpen = false, onClose }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Logo at Top - CENTERED */}
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

          {/* Brands List - COMPACT & CENTERED */}
          <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              nav::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="space-y-1.5">
              {brands.map((brand) => (
                <div key={brand.name} className="relative group">
                  <Link
                    href={`/${brand.name.toLowerCase()}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-1 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    {/* Logo Container - SMALLER & CENTERED */}
                    <div className="w-16 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span 
                      className={`text-gray-800 font-medium text-base whitespace-nowrap transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                      }`}
                    >
                      {brand.name}
                    </span>
                  </Link>
                  
                  {/* Tooltip */}
                  {!isHovered && !mobileOpen && (
                    <div className="hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[80] shadow-lg">
                      {brand.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}