 'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import MobileCard from '../components/MobileCard';

// Vivo mobiles data
const vivoMobiles = [
  {
    id: 1,
    name: 'Vivo V40',
    price: 89999,
    image: '/mobiles/vivo-v40.png',
    brand: 'Vivo',
  },
  {
    id: 2,
    name: 'Vivo V40 Pro',
    price: 119999,
    image: '/mobiles/vivo-v40-pro.png',
    brand: 'Vivo',
  },
  {
    id: 3,
    name: 'Vivo Y300',
    price: 44999,
    image: '/mobiles/vivo-y300.png',
    brand: 'Vivo',
  },
  {
    id: 4,
    name: 'Vivo Y28',
    price: 32999,
    image: '/mobiles/vivo-y28.png',
    brand: 'Vivo',
  },
  {
    id: 5,
    name: 'Vivo Y58',
    price: 38999,
    image: '/mobiles/vivo-y58.png',
    brand: 'Vivo',
  },
  {
    id: 6,
    name: 'Vivo T3 5G',
    price: 49999,
    image: '/mobiles/vivo-t3-5g.png',
    brand: 'Vivo',
  },
];

export default function VivoPage() {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);
  const [ramOpen, setRamOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-[#2F5BE7] text-center mb-8">
            Vivo Mobiles
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {vivoMobiles.map((mobile) => (
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

        <aside className="hidden xl:block w-56 p-4 bg-white border-l border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-1">
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setBrandsOpen(!brandsOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-[#2F5BE7] transition-colors"
              >
                <span>BRANDS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${brandsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setPriceRangeOpen(!priceRangeOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-[#2F5BE7] transition-colors"
              >
                <span>PRICE RANGE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${priceRangeOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setRamOpen(!ramOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-[#2F5BE7] transition-colors"
              >
                <span>RAM</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${ramOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setMemoryOpen(!memoryOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-[#2F5BE7] transition-colors"
              >
                <span>MEMORY</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${memoryOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full flex items-center justify-between py-1.5 font-semibold text-xs text-gray-800 hover:text-[#2F5BE7] transition-colors"
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