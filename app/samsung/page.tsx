 'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import MobileCard from '../components/MobileCard';

// Samsung mobiles data
const samsungMobiles = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 FE',
    price: 206999,
    image: '/mobiles/samsung-s24-fe.png',
    brand: 'Samsung',
  },
  {
    id: 2,
    name: 'Samsung Galaxy A06',
    price: 26999,
    image: '/mobiles/samsung-a06.png',
    brand: 'Samsung',
  },
  {
    id: 3,
    name: 'Samsung Galaxy Z Flip 6 5G',
    price: 384999,
    image: '/mobiles/samsung-z-flip-6.png',
    brand: 'Samsung',
  },
  {
    id: 4,
    name: 'Samsung Galaxy Z Fold 6 5G',
    price: 604999,
    image: '/mobiles/samsung-z-fold-6.png',
    brand: 'Samsung',
  },
  {
    id: 5,
    name: 'Samsung Galaxy A16',
    price: 45999,
    image: '/mobiles/samsung-a16.png',
    brand: 'Samsung',
  },
  {
    id: 6,
    name: 'Samsung Galaxy S23 FE',
    price: 189999,
    image: '/mobiles/samsung-s23-fe.png',
    brand: 'Samsung',
  },
  {
    id: 7,
    name: 'Samsung Galaxy A55',
    price: 119999,
    image: '/mobiles/samsung-a55.png',
    brand: 'Samsung',
  },
  {
    id: 8,
    name: 'Samsung Galaxy A35',
    price: 89999,
    image: '/mobiles/samsung-a35.png',
    brand: 'Samsung',
  },
  {
    id: 9,
    name: 'Samsung Galaxy S24 Ultra',
    price: 429999,
    image: '/mobiles/samsung-s24-ultra.png',
    brand: 'Samsung',
  },
  {
    id: 10,
    name: 'Samsung Galaxy A25',
    price: 64999,
    image: '/mobiles/samsung-a25.png',
    brand: 'Samsung',
  },
  {
    id: 11,
    name: 'Samsung Galaxy M35',
    price: 74999,
    image: '/mobiles/samsung-m35.png',
    brand: 'Samsung',
  },
  {
    id: 12,
    name: 'Samsung Galaxy A15',
    price: 39999,
    image: '/mobiles/samsung-a15.png',
    brand: 'Samsung',
  },
];

export default function SamsungPage() {
  // Filter states
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);
  const [ramOpen, setRamOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - with flex layout */}
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-blue-500 text-center mb-8">
            Samsung Mobiles
          </h1>

          {/* Mobile Grid - increased gap for more spacing between cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {samsungMobiles.map((mobile) => (
              <MobileCard
                key={mobile.id}
                id={mobile.id}
                name={mobile.name}
                price={mobile.price}
                image={mobile.image}
                brand={mobile.brand}
              />
            ))}
          </div>
        </main>

        {/* Right Sidebar - Filters (compact) */}
        <aside className="hidden xl:block w-56 p-4 bg-white border-l border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-1">

            {/* Brands Filter */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setBrandsOpen(!brandsOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span>BRANDS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${brandsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setPriceRangeOpen(!priceRangeOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span>SET YOUR PRICE RANGE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${priceRangeOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* RAM Filter */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setRamOpen(!ramOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span>RAM</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${ramOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Memory Filter */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setMemoryOpen(!memoryOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span>MEMORY</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${memoryOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Features Filter */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span>FEATURES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}