 // components/BrandPage.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface Mobile {
  id: string;
  name: string;
  price: number;
  image: string;
  isUpcoming?: boolean;
}

interface BrandPageProps {
  brandName: string;
  brandColor?: string;
  mobiles: Mobile[];
}

export default function BrandPage({ brandName, brandColor = 'blue', mobiles }: BrandPageProps) {
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  
  // Filter states
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);
  const [ramOpen, setRamOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
    black: 'text-gray-900',
  };

  const titleColorClass = colorClasses[brandColor as keyof typeof colorClasses] || 'text-blue-500';

  const brands = [
    { name: 'Samsung', href: '/samsung' },
    { name: 'Vivo', href: '/vivo' },
    { name: 'Oppo', href: '/oppo' },
    { name: 'Realme', href: '/realme' },
    { name: 'Apple', href: '/apple' },
    { name: 'Xiaomi', href: '/xiaomi' },
    { name: 'Infinix', href: '/infinix' },
    { name: 'Tecno', href: '/tecno' },
  ];

  return (
    <div className="flex gap-6">
      {/* Main Content Area */}
      <main className="flex-1">
        {/* Page Title */}
        <h1 className={`text-4xl font-bold ${titleColorClass} text-center mb-8`}>
          {brandName} Mobiles
        </h1>

        {/* Filters Bar */}
        <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUpcoming}
              onChange={(e) => setShowUpcoming(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">Upcoming</span>
          </label>

          <div className="ml-auto relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 font-medium cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="popular">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mobiles.map((mobile) => (
            <Link
              key={mobile.id}
              href={`/mobile/${mobile.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-200"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center p-6 group-hover:bg-gray-50 transition-colors">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {mobile.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  Rs. {mobile.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Right Sidebar - Filters */}
      <aside className="hidden xl:block w-80 bg-white rounded-lg shadow-sm p-6 sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="space-y-4">
          {/* Brands Filter */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setBrandsOpen(!brandsOpen)}
              className="w-full flex items-center justify-between py-2 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>BRANDS</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${brandsOpen ? 'rotate-180' : ''}`} />
            </button>
            {brandsOpen && (
              <div className="mt-3 space-y-2">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className={`block py-2 px-3 text-sm rounded-lg transition-colors ${
                      brand.name === brandName 
                        ? 'bg-blue-100 text-blue-700 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setPriceRangeOpen(!priceRangeOpen)}
              className="w-full flex items-center justify-between py-2 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>SET YOUR PRICE RANGE</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${priceRangeOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* RAM Filter */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setRamOpen(!ramOpen)}
              className="w-full flex items-center justify-between py-2 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>RAM</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${ramOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Memory Filter */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setMemoryOpen(!memoryOpen)}
              className="w-full flex items-center justify-between py-2 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>MEMORY</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${memoryOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Features Filter */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              className="w-full flex items-center justify-between py-2 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>FEATURES</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}