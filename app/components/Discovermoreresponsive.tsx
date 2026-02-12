 import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface DiscoverItem {
  title: string;
  href: string;
}

const discoverItems: DiscoverItem[] = [
  // Brands
  {
    title: 'Samsung',
    href: '/samsung',
  },
  {
    title: 'Vivo',
    href: '/vivo',
  },
  {
    title: 'Oppo',
    href: '/oppo',
  },
  {
    title: 'Realme',
    href: '/realme',
  },
  {
    title: 'Apple',
    href: '/apple',
  },
  {
    title: 'Xiaomi',
    href: '/xiaomi',
  },
  {
    title: 'Infinix',
    href: '/infinix',
  },
  {
    title: 'Tecno',
    href: '/tecno',
  },
 
 
];

export default function DiscoverMoreResponsive() {
  return (
    <section className="my-8">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Discover more
        </h2>
      </div>

      {/* Discover Items Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {discoverItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex items-center justify-between px-5 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
          >
            <span className="text-gray-800 text-sm md:text-base font-normal group-hover:text-blue-600 transition-colors">
              {item.title}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}